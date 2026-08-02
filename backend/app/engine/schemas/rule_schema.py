from pydantic import BaseModel, Field
from typing import Optional, Dict, Any

class RuleSourceSchema(BaseModel):
    bill: str = Field(..., description="Source bill title")
    clause: str = Field(..., description="Source clause identifier")
    section: str = Field(..., description="Source section")
    page: int = Field(..., description="PDF page number")
    paragraph: int = Field(default=1, description="Paragraph offset")

class RuleSchema(BaseModel):
    id: str = Field(..., description="Rule ID e.g. rule-17")
    rule_number: str = Field(..., description="Sequential rule number")
    title: str = Field(..., description="Rule title")
    category: str = Field(..., description="Legal category (Income Tax, Privacy, Capital Gains, etc.)")
    conditions: Dict[str, Any] = Field(..., description="Evaluated condition key-value pairs")
    effect: Dict[str, Any] = Field(..., description="Evaluated statutory effect key-value pairs")
    source: RuleSourceSchema = Field(..., description="Traceable citation source")
    confidence: float = Field(default=0.98, description="Combined confidence rating")
    reviewed: bool = Field(default=False, description="Human auditor review status")
    status: str = Field(default="Human Reviewed", description="Status tier label")

class RuleIngestionResponse(BaseModel):
    bill_id: int
    extracted_rules_count: int
    clauses_segmented_count: int
    confidence_average: float
    review_queue_count: int
    status: str
