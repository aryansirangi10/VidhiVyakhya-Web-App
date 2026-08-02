from typing import Optional, Dict, Any
from fastapi import APIRouter
from .service import document_service

router = APIRouter(prefix="/api/v1/documents", tags=["Legislative Intelligence Hub"])

@router.get("")
def list_documents(doc_type: Optional[str] = None, q: Optional[str] = None):
    return document_service.list_documents(doc_type=doc_type, query=q)

@router.get("/trending")
def trending_documents():
    return document_service.get_trending_documents()

@router.get("/recent")
def recent_documents():
    return document_service.list_documents()

@router.get("/{doc_id}")
def get_document(doc_id: int):
    return document_service.get_document_by_id(doc_id)

@router.get("/{doc_id}/related")
def get_related(doc_id: int):
    return document_service.get_related_documents(doc_id)

@router.post("/compare")
def compare_documents(payload: Dict[str, Any]):
    doc_a = payload.get("doc_a", "Finance Bill 2024")
    doc_b = payload.get("doc_b", "Finance Bill 2025")
    return document_service.compare_documents(doc_a, doc_b)

@router.post("/bookmark")
def bookmark_document(payload: Dict[str, Any]):
    return {"status": "SUCCESS", "message": "Document bookmarked successfully."}
