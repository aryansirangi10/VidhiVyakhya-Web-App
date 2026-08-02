from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.database import get_db
from app.schemas.schemas import CalculationRequest
from app.repositories.bill_repo import BillRepository
from app.evaluator import evaluate_bill_impact

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
        "term": "Financial Year",
        "definition": "The 12-month period running from April 1 to March 31 in which you earn your salary and business income.",
        "example": "If you earn income between April 1, 2025 and March 31, 2026, this period is FY 2025-26.",
        "related": ["Assessment Year", "Taxable Income"],
        "source": "Income Tax Rules"
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
        "definition": "Long-Term Capital Gains. The profit earned on sale of capital assets (like equity shares or property) held for a specified minimum period.",
        "example": "Equity shares sold after holding for more than 1 year incur LTCG. Budget 2024 revised this rate to 12.5%.",
        "related": ["Indexation", "Taxable Income"],
        "source": "Section 112A of the Income Tax Act"
    },
    {
        "term": "Section 80C",
        "definition": "A popular section allowing deductions up to ₹1.5 Lakhs for specified investments (PPF, ELSS, Life Insurance, EPF) under the old tax regime.",
        "example": "Investing ₹1,50,000 in PPF allows you to reduce your taxable income by the same amount under the old regime.",
        "related": ["Standard Deduction", "Taxable Income"],
        "source": "Section 80C of the Income Tax Act"
    },
    {
        "term": "Data Principal",
        "definition": "Under the DPDP Act 2023, the individual whose personal data is processed.",
        "example": "As an online user sharing your email with a shopping website, you are the Data Principal of your personal details.",
        "related": ["HUF", "Assessment Year"],
        "source": "Section 2(j) of the DPDP Act 2023"
    },
    {
        "term": "Taxable Income",
        "definition": "The final net income on which tax slabs are applied, computed after subtracting all deductions from gross total income.",
        "example": "Gross salary ₹10,00,000 - standard deduction ₹75,000 = taxable base ₹9,25,000.",
        "related": ["Assessment Year", "Standard Deduction"],
        "source": "Section 2(45) of the Income Tax Act"
    },
    {
        "term": "HUF",
        "definition": "Hindu Undivided Family. A separate tax entity consisting of all persons lineally descended from a common ancestor, treated as a separate unit for tax.",
        "example": "An HUF has its own PAN card and can claim standard deductions and slabs separate from individual members.",
        "related": ["Section 80C", "Taxable Income"],
        "source": "Section 2(31) of the Income Tax Act"
    },
    {
        "term": "Indexation",
        "definition": "Adjusting the purchase cost of an asset to account for inflation over the holding period before calculating capital gains.",
        "example": "If you bought property in 2015 and sell it in 2024, indexation inflates your purchase price, reducing taxable capital gains.",
        "related": ["LTCG", "Taxable Income"],
        "source": "Section 48 of the Income Tax Act"
    }
]

@router.post("/api/calculate")
@limiter.limit("15/minute")
def calculate_impact(request: Request, body: CalculationRequest, db: Session = Depends(get_db)):
    bill = BillRepository.get_by_id(db, body.bill_id)
    if not bill:
        raise HTTPException(status_code=404, detail="Bill not found.")
        
    rules = bill.rules
    profile_dict = body.profile.model_dump()
    
    # Evaluate
    result = evaluate_bill_impact(profile_dict, rules)
    return {
        "bill_id": bill.id,
        "title": bill.title,
        "total_impact": result["total_impact"],
        "explanation": result["explanation"],
        "triggered_rules": result["triggered_rules"]
    }

@router.get("/api/glossary")
def get_glossary():
    return GLOSSARY_ITEMS
