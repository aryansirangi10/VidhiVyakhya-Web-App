from typing import Dict, Any
from fastapi import APIRouter
from app.ai.assistant.assistant_service import assistant_service

router = APIRouter(prefix="/api/v1/assistant", tags=["AI Intelligence & Chat Assistant"])

@router.post("/chat")
def chat(payload: Dict[str, Any]):
    question = payload.get("question", payload.get("message", "How does Finance Bill 2024 affect me?"))
    return assistant_service.chat(question)

@router.post("/search")
def semantic_search(payload: Dict[str, Any]):
    query = payload.get("query", "standard deduction")
    return {"query": query, "results": assistant_service.chat(query)["citations"]}

@router.post("/compare")
def compare_bills(payload: Dict[str, Any]):
    bill_a = payload.get("bill_a", "Finance Bill 2024")
    bill_b = payload.get("bill_b", "Finance Bill 2025")
    return {
        "comparison": f"Comparison between {bill_a} and {bill_b}",
        "changes": [
            {"rule": "Standard Deduction", "old": "₹50,000", "new": "₹75,000", "diff": "+₹25,000"},
            {"rule": "LTCG Rate", "old": "10.0%", "new": "12.5%", "diff": "+2.5%"},
        ],
        "impact_summary": "Net tax savings increased for salaried income brackets up to ₹15 Lakhs.",
    }

@router.post("/summarize")
def summarize(payload: Dict[str, Any]):
    return {"summary": "Finance Bill 2024 introduces ₹75,000 standard deduction and revised 115BAC tax slabs."}

@router.get("/history")
def history():
    return [
        {"id": "c-1", "question": "How does Budget 2024 affect salaried employees?", "timestamp": "Yesterday"},
    ]

@router.post("/translate")
def translate(payload: Dict[str, Any]):
    lang = payload.get("language", "hi")
    return {
        "language": lang,
        "translated_text": "वित्त विधेयक 2024 के तहत मानक कटौती बढ़ाकर ₹75,000 कर दी गई है।",
    }
