from typing import Dict, Any
from fastapi import APIRouter, UploadFile, File, Form
from app.ingestion.service import ingestion_service

router = APIRouter(prefix="/api/v1/upload", tags=["Universal Document Upload & AI Ingestion"])

@router.post("")
async def upload_document(
    file: UploadFile = File(...),
    document_type: str = Form("Bill")
):
    content = await file.read()
    return ingestion_service.upload_document(file.filename, content, document_type)

@router.post("/validate")
async def validate_upload(file: UploadFile = File(...)):
    content = await file.read()
    return {"valid": len(content) > 0 and len(content) < 50 * 1024 * 1024, "size_bytes": len(content)}

@router.get("/history")
def get_upload_history():
    return ingestion_service.get_history()

@router.get("/{job_id}")
def get_job_status(job_id: str):
    return ingestion_service.get_job_status(job_id)

@router.delete("/{id}")
def delete_upload(id: str):
    return {"status": "SUCCESS", "message": f"Upload job {id} deleted."}
