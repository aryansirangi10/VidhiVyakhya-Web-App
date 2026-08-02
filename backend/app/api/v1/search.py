from fastapi import APIRouter
from app.services.search_service import global_search_service

router = APIRouter(prefix="/api/v1/search", tags=["Global Search & Discovery"])

@router.get("")
def search(q: str):
    return global_search_service.search_all(q)

@router.get("/suggestions")
def suggestions(prefix: str = ""):
    return global_search_service.get_suggestions(prefix)
