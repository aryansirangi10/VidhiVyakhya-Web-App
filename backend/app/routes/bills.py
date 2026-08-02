import re
import os
from typing import Optional
from fastapi import APIRouter, Depends, UploadFile, File, Form, Request, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.bill_service import BillService

router = APIRouter(prefix="/api/bills", tags=["Bills & Rules"])
UPLOADS_DIR = "/app/uploads"

@router.get("")
def list_bills(db: Session = Depends(get_db)):
    return BillService.list_all(db)

@router.get("/{bill_id}")
def get_bill(bill_id: int, db: Session = Depends(get_db)):
    return BillService.get_by_id(db, bill_id)

@router.get("/{bill_id}/timeline")
def get_bill_timeline(bill_id: int, db: Session = Depends(get_db)):
    return BillService.get_timeline(db, bill_id)

@router.get("/{bill_id}/metadata")
def get_bill_metadata(bill_id: int, db: Session = Depends(get_db)):
    return BillService.get_metadata(db, bill_id)

@router.get("/pdf/{filename}")
def get_pdf_file(filename: str):
    if not re.match(r"^[a-zA-Z0-9_\-\.]+\.pdf$", filename):
        raise HTTPException(status_code=400, detail="Invalid filename format.")
        
    file_path = os.path.join(UPLOADS_DIR, filename)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="PDF file not found.")
        
    return FileResponse(file_path, media_type="application/pdf")

@router.post("/upload")
def upload_bill(
    request: Request,
    title: str = Form(...),
    summary: str = Form(...),
    source_url: Optional[str] = Form(None),
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    user_api_key = request.headers.get("X-Gemini-API-Key")
    return BillService.upload_bill(
        db=db,
        title=title,
        summary=summary,
        source_url=source_url,
        file=file,
        api_key=user_api_key
    )
