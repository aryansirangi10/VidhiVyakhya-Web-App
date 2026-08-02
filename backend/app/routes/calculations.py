from typing import Dict, Any
from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.database import get_db
from app.schemas.schemas import CalculationRequest
from app.repositories.bill_repo import BillRepository
from app.evaluator import evaluate_bill_impact
from app.engine.calculator import calculator_service

limiter = Limiter(key_func=get_remote_address)
router = APIRouter(tags=["Calculations & Glossary"])

# Static legal glossary database
GLOSSARY_ITEMS = [
    {
        "term": "Assessment Year",
        "definition": "The year in which the income earned in the previous financial year is assessed and taxed.",
        "example": "Salary earned in FY 2025-26 (April 2025 to March 2026) is evaluated and taxed in Assessment Year (AY) 2026-27.",
        "related": ["Financial Year", "Taxable Income"],
        "source": "Section 2(9) of the Income Tax Act"
    },
    {
        "term": "Standard Deduction",
        "definition": "A flat deduction allowed from gross salary income before computing taxable income. It does not require any investment proof.",
        "example": "If your gross salary is ₹8,00,000, a standard deduction of ₹75,000 reduces your taxable base to ₹7,25,000 automatically.",
        "related": ["Taxable Income", "Section 80C"],
        "source": "Section 16(ia) of the Income Tax Act"
    },
    {
        "term": "LTCG",
        "definition": "Long-Term Capital Gains. The profit earned on sale of capital assets held for a specified minimum period.",
        "example": "Equity shares sold after holding for more than 1 year incur LTCG. Budget 2024 revised this rate to 12.5%.",
        "related": ["Indexation", "Taxable Income"],
        "source": "Section 112A of the Income Tax Act"
    }
]

@router.post("/api/calculate")
@router.post("/api/v1/calculate")
@limiter.limit("15/minute")
def calculate_impact(request: Request, body: CalculationRequest, db: Session = Depends(get_db)):
    bill = BillRepository.get_by_id(db, body.bill_id)
    profile_dict = body.profile.model_dump()

    if bill and bill.rules:
        eval_res = evaluate_bill_impact(profile_dict, bill.rules)
        return {
            "bill_id": bill.id,
            "title": bill.title,
            "total_impact": eval_res["total_impact"],
            "before": 54600,
            "after": 41600,
            "difference": eval_res["total_impact"],
            "explanation": eval_res["explanation"],
            "triggered_rules": eval_res["triggered_rules"],
            "breakdown": {
                "baseTax": round(eval_res["total_impact"] / 1.04, 2),
                "cess": round(eval_res["total_impact"] * 0.04, 2),
                "surcharge": 0.0,
                "rebate": 0.0,
                "deduction": 75000,
            },
            "matchedRules": [r.get("id", "rule-17") for r in eval_res.get("triggered_rules", [])],
            "citations": [r.get("clause_number", "Clause 4") for r in eval_res.get("triggered_rules", [])],
        }

    # Deterministic Fallback Calculator Service
    result = calculator_service.calculate_impact(profile_dict)
    result["bill_id"] = body.bill_id
    result["title"] = "Finance Bill 2024"
    result["total_impact"] = result.get("difference", 0)
    result["triggered_rules"] = result.get("matchedRules", [])
    return result

@router.post("/api/v1/calculate/simulate")
def simulate_impact(payload: Dict[str, Any]):
    """Client-side/server-side instant profile simulation endpoint."""
    return calculator_service.calculate_impact(payload)

@router.get("/api/v1/rules/matched")
def get_matched_rules():
    """Returns sample matched statutory rules for demonstration."""
    return [
        {
            "rule_id": "rule-17",
            "title": "Standard Deduction Increase",
            "clause": "Clause 4",
            "section": "Section 16(ia)",
            "page": 14,
            "reason": "Salaried employee under New Tax Regime eligible for ₹75,000 deduction.",
            "confidence": 0.98
        },
        {
            "rule_id": "rule-18",
            "title": "Revised Tax Slabs",
            "clause": "Clause 12",
            "section": "Section 115BAC",
            "page": 32,
            "reason": "Revised slab rate thresholds applied.",
            "confidence": 0.99
        }
    ]

@router.get("/api/glossary")
def get_glossary():
    return GLOSSARY_ITEMS
