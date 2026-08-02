import os
import json
import math
from typing import Optional, List, Dict, Any
from datetime import datetime

from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, DateTime, Text, JSON
from sqlalchemy.orm import declarative_base, sessionmaker, Session

# ==========================================
# 1. DATABASE & MODELS (SQLAlchemy)
# ==========================================
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./standalone_vidhi.db")

engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False} if "sqlite" in DATABASE_URL else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

class BillModel(Base):
    __tablename__ = "bills"

    id = Column(Integer, primary_order=True, primary_key=True, index=True)
    title = Column(String, nullable=False)
    summary = Column(Text, nullable=False)
    source_url = Column(String, nullable=True)
    pdf_path = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    
    # Enriched metadata
    status = Column(String, default="Implemented")
    current_stage = Column(String, default="Implemented")
    reading_time = Column(Integer, default=5)
    pages = Column(Integer, default=100)
    ministry = Column(String, default="Finance")
    bill_number = Column(String, default="Bill No. 1")
    category = Column(String, default="Tax")

class RuleModel(Base):
    __tablename__ = "extracted_rules"

    id = Column(Integer, primary_key=True, index=True)
    bill_id = Column(Integer, nullable=False)
    clause_number = Column(String, nullable=False)
    clause_text = Column(Text, nullable=False)
    rule_type = Column(String, nullable=False)
    source_span = Column(JSON, nullable=True)
    confidence = Column(Float, default=0.95)
    reviewed = Column(Boolean, default=True)
    reviewed_by = Column(String, default="Auditor")

Base.metadata.create_all(bind=engine)

# ==========================================
# 2. SCHEMAS (Pydantic)
# ==========================================
class ProfileData(BaseModel):
    annual_income: float
    age: int
    tax_regime: str  # 'new' or 'old'
    state: str
    employment_category: str  # 'salaried' or 'business'
    equity_ltsg: Optional[float] = 0.0

class CalculationRequest(BaseModel):
    bill_id: int
    profile: ProfileData

# ==========================================
# 3. LOCAL EVALUATION ENGINE
# ==========================================
def calculate_tax_new_regime_old_slabs(taxable_income: float) -> float:
    tax = 0.0
    if taxable_income <= 300000:
        return 0.0
    if taxable_income > 300000:
        tax += min(300000.0, taxable_income - 300000.0) * 0.05
    if taxable_income > 600000:
        tax += min(300000.0, taxable_income - 600000.0) * 0.10
    if taxable_income > 900000:
        tax += min(300000.0, taxable_income - 900000.0) * 0.15
    if taxable_income > 1200000:
        tax += min(300000.0, taxable_income - 1200000.0) * 0.20
    if taxable_income > 1500000:
        tax += (taxable_income - 1500000.0) * 0.30
    return tax

def calculate_tax_new_regime_revised_slabs(taxable_income: float) -> float:
    tax = 0.0
    if taxable_income <= 300000:
        return 0.0
    if taxable_income > 300000:
        tax += min(400000.0, taxable_income - 300000.0) * 0.05
    if taxable_income > 700000:
        tax += min(300000.0, taxable_income - 700000.0) * 0.10
    if taxable_income > 1000000:
        tax += min(200000.0, taxable_income - 1000000.0) * 0.15
    if taxable_income > 1200000:
        tax += min(300000.0, taxable_income - 1200000.0) * 0.20
    if taxable_income > 1500000:
        tax += (taxable_income - 1500000.0) * 0.30
    return tax

def evaluate_impact(bill_id: int, profile: ProfileData, rules: List[RuleModel]) -> Dict[str, Any]:
    income = profile.annual_income
    is_salaried = profile.employment_category == "salaried"
    is_new_regime = profile.tax_regime == "new"
    
    total_impact = 0.0
    triggered_rules = []

    if bill_id == 1 and is_new_regime:
        std_deduction_savings = 0.0
        if is_salaried:
            marginal_rate = 0.30 if income > 1500000 else (0.20 if income > 1200000 else (0.15 if income > 1000000 else 0.10))
            std_deduction_savings = 25000 * marginal_rate * 1.04
            total_impact += std_deduction_savings
            
            if len(rules) > 0:
                r = rules[0]
                triggered_rules.append({
                    "id": r.id,
                    "clause_number": r.clause_number,
                    "clause_text": r.clause_text,
                    "rule_type": r.rule_type,
                    "impact": round(std_deduction_savings, 2),
                    "explanation": f"Increased Standard Deduction to ₹75,000 saves ₹{round(std_deduction_savings):,}."
                })

        old_taxable = max(0.0, income - (50000.0 if is_salaried else 0.0))
        new_taxable = max(0.0, income - (75000.0 if is_salaried else 0.0))
        
        old_tax = calculate_tax_new_regime_old_slabs(old_taxable) * 1.04
        new_tax = calculate_tax_new_regime_revised_slabs(new_taxable) * 1.04
        
        slab_savings = max(0.0, (old_tax - new_tax) - (std_deduction_savings if is_salaried else 0.0))
        total_impact += slab_savings

        if len(rules) > 1:
            r = rules[1]
            triggered_rules.append({
                "id": r.id,
                "clause_number": r.clause_number,
                "clause_text": r.clause_text,
                "rule_type": r.rule_type,
                "impact": round(slab_savings, 2),
                "explanation": f"Revised tax slabs under Section 115BAC save ₹{round(slab_savings):,}."
            })

        explanation = f"Estimated savings of ₹{round(total_impact):,} under Finance Bill 2024."
    
    elif bill_id == 3 and (profile.equity_ltsg or 0) > 0:
        ltcg = profile.equity_ltsg or 0.0
        old_tax = max(0.0, ltcg - 100000.0) * 0.10 * 1.04
        new_tax = max(0.0, ltcg - 125000.0) * 0.125 * 1.04
        ltcg_impact = old_tax - new_tax
        total_impact = ltcg_impact

        if len(rules) > 0:
            r = rules[0]
            triggered_rules.append({
                "id": r.id,
                "clause_number": r.clause_number,
                "clause_text": r.clause_text,
                "rule_type": r.rule_type,
                "impact": round(ltcg_impact, 2),
                "explanation": f"LTCG rate change impact: {'+' if ltcg_impact>=0 else ''}₹{round(ltcg_impact):,}."
            })

        explanation = f"Net LTCG tax impact: {'Savings of' if ltcg_impact>=0 else 'Additional cost of'} ₹{abs(round(ltcg_impact)):,}."
    
    else:
        explanation = "No matching rules for your profile in this bill."

    return {
        "bill_id": bill_id,
        "total_impact": round(total_impact, 2),
        "explanation": explanation,
        "triggered_rules": triggered_rules
    }

# ==========================================
# 4. FASTAPI APP & ROUTES
# ==========================================
app = FastAPI(
    title="VidhiVyakhya Single-File API",
    description="Law, Decoded Personally — Standalone FastAPI Backend",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# SEED INITIAL DATA ON STARTUP
@app.on_event("startup")
def seed_data():
    db = SessionLocal()
    if db.query(BillModel).count() == 0:
        b1 = BillModel(
            id=1,
            title="Finance Bill 2024",
            summary="Revises tax slabs and increases the standard deduction to ₹75,000 for salaried employees under the new tax regime.",
            ministry="Ministry of Finance",
            bill_number="Bill No. 78 of 2024",
            category="Income Tax",
            reading_time=4,
            pages=412
        )
        b2 = BillModel(
            id=2,
            title="DPDP Act 2023 (Data Protection)",
            summary="Sets personal data protection obligations and mandates penalties up to ₹250 Cr for compliance failures.",
            ministry="Ministry of Electronics & IT",
            bill_number="Act No. 22 of 2023",
            category="Data Privacy",
            reading_time=6,
            pages=48
        )
        b3 = BillModel(
            id=3,
            title="Budget 2024 (Capital Gains Amendment)",
            summary="Increases standard Equity Long-Term Capital Gains (LTCG) tax rate to 12.5% and expands exemption limit to ₹1.25 Lakhs.",
            ministry="Ministry of Finance",
            bill_number="Bill No. 80 of 2024",
            category="Capital Gains",
            reading_time=3,
            pages=64
        )
        db.add_all([b1, b2, b3])
        db.commit()

        r1 = RuleModel(
            bill_id=1,
            clause_number="Clause 4",
            clause_text="In section 115BAC of the Income-tax Act, standard deduction is raised from 50,000 to 75,000 rupees for salaried employees.",
            rule_type="standard_deduction",
            confidence=0.98
        )
        r2 = RuleModel(
            bill_id=1,
            clause_number="Clause 3",
            clause_text="Clause 3: Slabs adjusted to 3L Nil, 3L-7L 5%, 7L-10L 10%, 10L-12L 15%, 12L-15L 20%, Above 15L 30%.",
            rule_type="tax_slab",
            confidence=0.99
        )
        r3 = RuleModel(
            bill_id=3,
            clause_number="Clause 22",
            clause_text="Tax on long-term capital gains from equity shares increased from 10% to 12.5%. Exemption limit raised to ₹1.25 Lakhs.",
            rule_type="capital_gains",
            confidence=0.97
        )
        db.add_all([r1, r2, r3])
        db.commit()
    db.close()

@app.get("/api/bills")
def list_bills(db: Session = Depends(get_db)):
    return db.query(BillModel).all()

@app.get("/api/bills/{bill_id}")
def get_bill(bill_id: int, db: Session = Depends(get_db)):
    bill = db.query(BillModel).filter(BillModel.id == bill_id).first()
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found")
    rules = db.query(RuleModel).filter(RuleModel.bill_id == bill_id).all()
    return {
        "id": bill.id,
        "title": bill.title,
        "summary": bill.summary,
        "ministry": bill.ministry,
        "bill_number": bill.bill_number,
        "category": bill.category,
        "reading_time": bill.reading_time,
        "pages": bill.pages,
        "status": bill.status,
        "rules": rules
    }

@app.post("/api/calculate")
def calculate_impact_api(req: CalculationRequest, db: Session = Depends(get_db)):
    rules = db.query(RuleModel).filter(RuleModel.bill_id == req.bill_id).all()
    result = evaluate_impact(req.bill_id, req.profile, rules)
    return result

@app.get("/api/glossary")
def get_glossary():
    return [
        {"term": "Standard Deduction", "definition": "A flat deduction allowed from gross salary income before computing taxable income."},
        {"term": "Assessment Year", "definition": "The year in which the income earned in the previous financial year is assessed and taxed."},
        {"term": "Section 115BAC", "definition": "Special tax regime providing lower tax rates for individuals not claiming specified exemptions/deductions."},
        {"term": "LTCG", "definition": "Long-Term Capital Gains. Profits earned on sale of capital assets held beyond specified holding periods."},
        {"term": "Cess", "definition": "An additional tax levied by the government for specific public health and education purposes (4%)."}
    ]

if __name__ == "__main__":
    import uvicorn
    print("Starting VidhiVyakhya Standalone API server on http://localhost:8000 ...")
    uvicorn.run(app, host="0.0.0.0", port=8000)
