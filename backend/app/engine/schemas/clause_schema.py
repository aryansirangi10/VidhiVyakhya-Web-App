from pydantic import BaseModel, Field
from typing import Optional, List

class ClauseSchema(BaseModel):
    clause_id: str = Field(..., description="Unique clause identifier e.g. Clause 4")
    section: str = Field(..., description="Statutory section reference e.g. Section 16(ia)")
    title: str = Field(..., description="Short clause title")
    content: str = Field(..., description="Raw statutory text")
    page_number: int = Field(..., description="Page number in source PDF")
    confidence: float = Field(default=0.98, description="Extraction confidence score")

class ClauseListSchema(BaseModel):
    bill_id: int
    clauses: List[ClauseSchema]
