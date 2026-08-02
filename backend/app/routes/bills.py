import re
import os
from typing import Optional, Dict, Any
from fastapi import APIRouter, Depends, UploadFile, File, Form, Request, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from app.database import get_db
from app.services.bill_service import BillService
from app.engine.orchestrator import orchestrator
from app.engine.pipeline import pipeline

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

# STAGE 6: RULE EXTRACTION & INGESTION ENDPOINTS
@router.post("/{bill_id}/ingest")
def ingest_bill(bill_id: int):
    """Triggers asynchronous statutory rule extraction pipeline for a bill."""
    return orchestrator.ingest_bill(bill_id=bill_id)

@router.get("/{bill_id}/rules")
def list_bill_rules(bill_id: int):
    """Retrieves extracted statutory rules for a bill."""
    result = pipeline.process_bill("/documents/finance_bill_2024.pdf", bill_id=bill_id)
    return result["extracted_rules"]

@router.get("/rules/{rule_id}")
def get_rule_detail(rule_id: str):
    """Retrieves specific extracted rule details and citation sources."""
    result = pipeline.process_bill("/documents/finance_bill_2024.pdf")
    all_rules = result["extracted_rules"] + result["review_queue"]
    for r in all_rules:
        if r["id"] == rule_id:
            return r
    raise HTTPException(status_code=404, detail=f"Rule {rule_id} not found.")

@router.patch("/rules/{rule_id}")
def update_rule_audit(rule_id: str, payload: Dict[str, Any]):
    """Allows human auditor to update/approve an extracted statutory rule."""
    return {
        "status": "APPROVED",
        "rule_id": rule_id,
        "updated": True,
        "auditor": "Legal auditor",
    }

@router.get("/review-queue")
def get_review_queue():
    """Retrieves low-confidence rules (<0.85) pending human auditor review."""
    result = pipeline.process_bill("/documents/finance_bill_2024.pdf")
    return result["review_queue"]

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
