import os
import re
import logging
from datetime import datetime, timedelta
from typing import List, Optional
from fastapi import FastAPI, Depends, HTTPException, status, UploadFile, File, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr
from jose import JWTError, jwt
from passlib.context import CryptContext
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from app.database import get_db, engine, Base
from app.models import User, Profile, Bill, Rule, Simulation
from app.seed import seed_bills_and_rules
from app.evaluator import evaluate_bill_impact
from app.extractor import extract_rules

# 1. Logging Setup with Sensitive Data Scrubber Filter
class LogScrubberFilter(logging.Filter):
    def filter(self, record):
        if not isinstance(record.msg, str):
            return True
        # Redact common profile fields in log strings
        msg = record.msg
        sensitive_patterns = [
            (r'(?i)"annual_income"\s*:\s*[^,}]+', '"annual_income": "[REDACTED]"'),
            (r'(?i)"age"\s*:\s*[^,}]+', '"age": "[REDACTED]"'),
            (r'(?i)"state"\s*:\s*[^,}]+', '"state": "[REDACTED]"'),
            (r'(?i)"employment_category"\s*:\s*[^,}]+', '"employment_category": "[REDACTED]"'),
            (r'(?i)"equity_ltsg"\s*:\s*[^,}]+', '"equity_ltsg": "[REDACTED]"'),
            (r'(?i)"password"\s*:\s*[^,}]+', '"password": "[REDACTED]"'),
            (r'(?i)annual_income=\S+', 'annual_income=[REDACTED]'),
            (r'(?i)age=\S+', 'age=[REDACTED]')
        ]
        for pattern, replacement in sensitive_patterns:
            msg = re.sub(pattern, replacement, msg)
        record.msg = msg
        return True

# Apply scrubber filter to default loggers
logging.basicConfig(level=logging.INFO)
for logger_name in ["uvicorn", "uvicorn.access", "uvicorn.error"]:
    logger = logging.getLogger(logger_name)
    logger.addFilter(LogScrubberFilter())

# 2. FastAPI Init & Rate Limiter
limiter = Limiter(key_func=get_remote_address)
app = FastAPI(title="VidhiVyakhya API")
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# 3. Database Initialization & Seeding on Startup
@app.on_event("startup")
def startup_db():
    Base.metadata.create_all(bind=engine)
    with Session(engine) as db:
        try:
            seed_bills_and_rules(db)
        except Exception as e:
            print(f"Error seeding database: {e}")


# CORS Middleware configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust for production, e.g. ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Auth Configurations
SECRET_KEY = os.getenv("JWT_SECRET", "supersecretjwtkeyforvidhibillsprotection")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 1440 # 24 hours
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Dependency for current user
async def get_current_user(request: Request, db: Session = Depends(get_db)):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing token or invalid schema",
        )
    token = auth_header.split(" ")[1]
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = db.query(User).filter(User.email == email).first()
    if user is None:
        raise credentials_exception
    return user

# Pydantic Schemas
class UserRegister(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class ProfileDataSchema(BaseModel):
    annual_income: float
    age: int
    tax_regime: str
    state: str
    employment_category: str
    equity_ltsg: Optional[float] = 0.0

class ProfileCreateSchema(BaseModel):
    name: str
    profile_data: ProfileDataSchema

class CalculationRequest(BaseModel):
    bill_id: int
    profile: ProfileDataSchema

class SaveHistoryRequest(BaseModel):
    profile_id: Optional[int] = None
    bill_id: int
    calculated_impact: float
    explanation: str
    details_json: dict

# Routes

# Auth Routes
@app.post("/api/auth/register", status_code=status.HTTP_201_CREATED)
def register(user_data: UserRegister, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user_data.email).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    hashed_pwd = get_password_hash(user_data.password)
    user = User(email=user_data.email, password_hash=hashed_pwd)
    db.add(user)
    db.commit()
    return {"message": "User registered successfully"}

@app.post("/api/auth/login", response_model=Token)
def login(user_data: UserRegister, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == user_data.email).first()
    if not user or not verify_password(user_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.delete("/api/auth/account")
def delete_account(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    db.delete(current_user)
    db.commit()
    return {"message": "Account and all associated profiles deleted successfully."}

# Profiles Routes (Auth needed)
@app.get("/api/profiles")
def list_profiles(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    profiles = db.query(Profile).filter(Profile.user_id == current_user.id).all()
    result = []
    for p in profiles:
        result.append({
            "id": p.id,
            "name": p.name,
            "profile_data": p.get_profile_data()
        })
    return result

@app.post("/api/profiles")
def create_profile(
    profile_in: ProfileCreateSchema,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = Profile(user_id=current_user.id, name=profile_in.name)
    profile.set_profile_data(profile_in.profile_data.model_dump())
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return {
        "id": profile.id,
        "name": profile.name,
        "profile_data": profile.get_profile_data()
    }

@app.delete("/api/profiles/{profile_id}")
def delete_profile(
    profile_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    profile = db.query(Profile).filter(Profile.id == profile_id, Profile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    db.delete(profile)
    db.commit()
    return {"message": "Profile deleted successfully"}

# Bills Routes
@app.get("/api/bills")
def list_bills(db: Session = Depends(get_db)):
    bills = db.query(Bill).order_by(Bill.created_at.desc()).all()
    return [
        {"id": b.id, "title": b.title, "summary": b.summary, "source_url": b.source_url, "pdf_path": b.pdf_path}
        for b in bills
    ]

@app.get("/api/bills/{bill_id}")
def get_bill(bill_id: int, db: Session = Depends(get_db)):
    bill = db.query(Bill).filter(Bill.id == bill_id).first()
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    return {
        "id": bill.id,
        "title": bill.title,
        "summary": bill.summary,
        "source_url": bill.source_url,
        "pdf_path": bill.pdf_path,
        "rules": [
            {
                "id": r.id,
                "clause_number": r.clause_number,
                "clause_text": r.clause_text,
                "rule_type": r.rule_type,
                "source_span": r.source_span,
                "confidence": r.confidence,
                "reviewed": r.reviewed
            } for r in bill.rules
        ]
    }

@app.get("/api/bills/pdf/{filename}")
def get_pdf_file(filename: str):
    # Security check to prevent directory traversal
    if not re.match(r"^[a-zA-Z0-9_\-\.]+\.pdf$", filename):
        raise HTTPException(status_code=400, detail="Invalid filename format")
    
    file_path = os.path.join(UPLOADS_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="PDF file not found")
        
    return FileResponse(file_path, media_type="application/pdf")

@app.post("/api/bills/upload")
def upload_bill(
    title: str = Form(...),
    summary: str = Form(...),
    source_url: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    request: Request = Request
):
    # Check if a custom user API Key is provided in the headers
    user_api_key = request.headers.get("X-Gemini-API-Key")
    
    # Save file
    file_uuid = os.urandom(8).hex()
    clean_filename = re.sub(r'[^a-zA-Z0-9_\-\.]', '', file.filename)
    safe_filename = f"{file_uuid}_{clean_filename}"

    if not safe_filename.endswith(".pdf"):
        safe_filename += ".pdf"
        
    target_path = os.path.join(UPLOADS_DIR, safe_filename)
    try:
        with open(target_path, "wb") as f:
            f.write(file.file.read())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save file: {e}")
        
    # Extract rules (Gemini vs Mock)
    try:
        rules_list = extract_rules(target_path, file.filename, user_api_key)
    except Exception as e:
        # Cleanup file if extraction fails
        if os.path.exists(target_path):
            os.remove(target_path)
        raise HTTPException(status_code=500, detail=f"Rule extraction failed: {e}")

    # Create bill record
    bill = Bill(
        title=title,
        summary=summary,
        source_url=source_url,
        pdf_path=safe_filename
    )
    db.add(bill)
    db.commit()
    db.refresh(bill)

    # Insert rules
    for r in rules_list:
        rule_db = Rule(
            bill_id=bill.id,
            clause_number=r.get("clause_number", "General"),
            clause_text=r.get("clause_text", ""),
            rule_type=r.get("rule_type", "other"),
            condition_json=r.get("condition_json", {}),
            formula_json=r.get("formula_json", {}),
            source_span=r.get("source_span", {}),
            confidence=r.get("confidence", 0.5),
            reviewed=False
        )
        db.add(rule_db)
    db.commit()

    return {
        "id": bill.id,
        "title": bill.title,
        "summary": bill.summary,
        "pdf_path": bill.pdf_path,
        "rules_extracted_count": len(rules_list)
    }

# Calculation & History Route (Rate Limited)
@app.post("/api/calculate")
@limiter.limit("15/minute")
def calculate_impact(request: Request, body: CalculationRequest, db: Session = Depends(get_db)):
    bill = db.query(Bill).filter(Bill.id == body.bill_id).first()
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
        
    rules = bill.rules
    profile_dict = body.profile.model_dump()
    
    # Deterministic Evaluation
    result = evaluate_bill_impact(profile_dict, rules)
    return {
        "bill_id": bill.id,
        "title": bill.title,
        "total_impact": result["total_impact"],
        "explanation": result["explanation"],
        "triggered_rules": result["triggered_rules"]
    }

@app.get("/api/history")
def list_history(
    profile_id: Optional[int] = None,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Find active profiles for this user
    user_profile_ids = [p.id for p in current_user.profiles]
    
    if profile_id:
        if profile_id not in user_profile_ids:
            raise HTTPException(status_code=403, detail="Access denied to profile history")
        sims = db.query(Simulation).filter(Simulation.profile_id == profile_id).order_by(Simulation.created_at.desc()).all()
    else:
        sims = db.query(Simulation).filter(Simulation.profile_id.in_(user_profile_ids)).order_by(Simulation.created_at.desc()).all()
        
    return [
        {
            "id": s.id,
            "profile_id": s.profile_id,
            "bill_id": s.bill_id,
            "bill_title": s.bill.title,
            "calculated_impact": s.calculated_impact,
            "explanation": s.explanation,
            "details_json": s.details_json,
            "created_at": s.created_at
        } for s in sims
    ]

@app.post("/api/history")
def save_history(
    body: SaveHistoryRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    # Validate profile ownership
    user_profile_ids = [p.id for p in current_user.profiles]
    if body.profile_id not in user_profile_ids:
        raise HTTPException(status_code=400, detail="Invalid profile ID for this user")
        
    # Idempotency check: Upsert simulation for this profile_id and bill_id to prevent duplicates
    existing_sim = db.query(Simulation).filter(
        Simulation.profile_id == body.profile_id,
        Simulation.bill_id == body.bill_id
    ).first()
    
    if existing_sim:
        existing_sim.calculated_impact = body.calculated_impact
        existing_sim.explanation = body.explanation
        existing_sim.details_json = body.details_json
        existing_sim.created_at = datetime.utcnow()
        db.commit()
        db.refresh(existing_sim)
        return {"message": "History updated successfully", "id": existing_sim.id}
    else:
        new_sim = Simulation(
            profile_id=body.profile_id,
            bill_id=body.bill_id,
            calculated_impact=body.calculated_impact,
            explanation=body.explanation,
            details_json=body.details_json
        )
        db.add(new_sim)
        db.commit()
        db.refresh(new_sim)
        return {"message": "History saved successfully", "id": new_sim.id}
