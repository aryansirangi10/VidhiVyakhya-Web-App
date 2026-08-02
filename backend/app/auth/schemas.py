from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List, Dict, Any
from datetime import datetime

class UserRegisterRequest(BaseModel):
    email: EmailStr
    password: str = Field(..., min_length=8)
    full_name: Optional[str] = "Citizen User"

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"
    expires_in: int = 900
    user_id: int
    email: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr

class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str = Field(..., min_length=8)

class UserProfileRequest(BaseModel):
    display_name: str
    employment: str = "salaried"
    tax_regime: str = "new"
    state: str = "Maharashtra"
    annual_income: float = 1200000.0
    capital_gains: float = 0.0
    default_profile: bool = False

class UserProfileResponse(BaseModel):
    id: int
    user_id: int
    display_name: str
    employment: str
    tax_regime: str
    state: str
    annual_income: float
    capital_gains: float
    default_profile: bool
    created_at: Optional[str] = None
