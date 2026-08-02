from typing import Optional, List
from pydantic import BaseModel, EmailStr

class UserRegister(BaseModel):
    email: EmailStr
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class ProfileDataSchema(BaseModel):
    annual_income: float
    age: int
    tax_regime: str
    state: str
    employment_category: str
    equity_ltsg: Optional[float] = 0.0

class ProfileCreateSchema(BaseModel):
    name: str
    profile_data: ProfileDataSchema
    display_name: Optional[str] = None
    avatar: Optional[str] = None
    color: Optional[str] = None
    default_profile: Optional[bool] = False

class ProfileResponseSchema(BaseModel):
    id: int
    name: str
    profile_data: ProfileDataSchema
    display_name: Optional[str] = None
    avatar: Optional[str] = None
    color: Optional[str] = None
    default_profile: bool

class CalculationRequest(BaseModel):
    bill_id: int
    profile: ProfileDataSchema

class SaveHistoryRequest(BaseModel):
    profile_id: Optional[int] = None
    bill_id: int
    calculated_impact: float
    explanation: str
    details_json: dict
