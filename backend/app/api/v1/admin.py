from fastapi import APIRouter
from app.core.metrics import metrics
from app.engine.pipeline import pipeline

router = APIRouter(prefix="/api/v1/admin", tags=["Administrative & Observability Workspace"])

@router.get("/review-queue")
def get_review_queue():
    result = pipeline.process_bill("/documents/finance_bill_2024.pdf")
    return result["review_queue"]

@router.post("/approve/{rule_id}")
def approve_rule(rule_id: str):
    return {"status": "APPROVED", "rule_id": rule_id, "confidence": 1.0}

@router.get("/metrics")
def get_metrics():
    return metrics.get_summary()
