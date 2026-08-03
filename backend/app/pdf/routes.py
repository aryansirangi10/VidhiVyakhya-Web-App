from typing import Dict, Any, Optional
from fastapi import APIRouter
from app.pdf.service import pdf_intelligence_service

router = APIRouter(prefix="/api/v1/pdf", tags=["PDF Intelligence Workspace"])

@router.get("/{id}")
def get_pdf_metadata(id: str):
    return {
        "id": id,
        "title": "Finance Bill 2024 (Official Gazette)",
        "total_pages": 148,
        "pdf_url": f"/api/bills/pdf/{id}.pdf",
    }

@router.get("/highlights/{id}")
def get_highlights(id: str):
    return pdf_intelligence_service.get_highlights(id)

@router.get("/bookmarks/{id}")
def get_bookmarks(id: str):
    return pdf_intelligence_service.get_bookmarks(id)

@router.post("/bookmark")
def add_bookmark(payload: Dict[str, Any]):
    doc_id = payload.get("doc_id", "1")
    page = payload.get("page", 1)
    clause_id = payload.get("clause_id", "Clause 4")
    title = payload.get("title", "Bookmark")
    return pdf_intelligence_service.add_bookmark(doc_id, page, clause_id, title)

@router.post("/comment")
def add_comment(payload: Dict[str, Any]):
    doc_id = payload.get("doc_id", "1")
    clause_id = payload.get("clause_id", "Clause 4")
    text = payload.get("text", "Sample comment")
    return pdf_intelligence_service.add_comment(doc_id, clause_id, text)

@router.get("/search")
def search_pdf(q: str):
    return pdf_intelligence_service.search_pdf(q)
