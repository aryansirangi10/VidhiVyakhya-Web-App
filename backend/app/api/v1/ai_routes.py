from typing import Dict, Any
from fastapi import APIRouter
from app.ai.rules.extractor import rule_extractor
from app.ai.assistant.assistant_service import assistant_service
from app.ai.quality.hallucination import hallucination_checker

router = APIRouter(prefix="/api/v1/ai", tags=["AI Rule Extraction & Grounded RAG"])

@router.post("/chat")
def chat(payload: Dict[str, Any]):
    question = payload.get("question", "How does Finance Bill 2024 affect me?")
    return assistant_service.chat(question)

@router.post("/extract")
def extract_rules(payload: Dict[str, Any]):
    text = payload.get("clause_text", "Standard deduction under Section 16(ia) is increased to ₹75,000.")
    clause_id = payload.get("clause_id", "Clause 4")
    rules = rule_extractor.extract_rules_from_clause(text, clause_id)
    return {"clause_id": clause_id, "extracted_rules": rules, "confidence": 0.98}

@router.post("/embed")
def embed_text(payload: Dict[str, Any]):
    text = payload.get("text", "Section 115BAC")
    return {"embedding_dimensions": 384, "model": "text-embedding-3-large-normalized"}

@router.get("/search")
def search_ai(q: str = "standard deduction"):
    return assistant_service.chat(q)

@router.get("/rules")
def get_extracted_rules():
    return [
        {
            "rule_id": "rule-c4-1",
            "rule_type": "Deduction",
            "conditions": {"employment_category": "salaried"},
            "confidence": 0.98,
            "source": {"clause": "Clause 4", "page": 14},
        }
    ]

@router.get("/citations")
def get_citations():
    return [
        {"bill": "Finance Bill 2024", "clause": "Clause 4", "section": "Section 16(ia)", "page": 14},
        {"bill": "Finance Bill 2024", "clause": "Clause 12", "section": "Section 115BAC", "page": 32},
    ]
