from typing import Dict, Any, Optional, List
from .password import password_service
from .jwt import jwt_service
from .encryption import profile_encryption
from .schemas import TokenResponse, UserProfileResponse

# In-memory session database mock for enterprise auth service
USERS_DB: Dict[str, Dict[str, Any]] = {}
PROFILES_DB: List[Dict[str, Any]] = []
PROFILE_ID_COUNTER = 1

class AuthService:
    def register_user(self, email: str, password: str, full_name: str = "Citizen User") -> Dict[str, Any]:
        if email in USERS_DB:
            raise ValueError("User with this email already exists.")
        
        pwd_hash = password_service.hash_password(password)
        user_id = len(USERS_DB) + 1
        user = {
            "id": user_id,
            "email": email,
            "password_hash": pwd_hash,
            "full_name": full_name,
            "email_verified": True,
            "role": "USER",
        }
        USERS_DB[email] = user
        return user

    def login_user(self, email: str, password: str) -> TokenResponse:
        user = USERS_DB.get(email)
        if not user or not password_service.verify_password(password, user["password_hash"]):
            raise ValueError("Invalid email or password.")

        access_token = jwt_service.create_access_token({"sub": str(user["id"]), "email": email, "role": user["role"]})
        refresh_token = jwt_service.create_refresh_token({"sub": str(user["id"]), "email": email})

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            user_id=user["id"],
            email=email,
        )

    def create_profile(self, user_id: int, display_name: str, employment: str, tax_regime: str, state: str, income: float, capital_gains: float) -> UserProfileResponse:
        global PROFILE_ID_COUNTER
        enc_income = profile_encryption.encrypt_val(income)
        enc_gains = profile_encryption.encrypt_val(capital_gains)

        profile = {
            "id": PROFILE_ID_COUNTER,
            "user_id": user_id,
            "display_name": display_name,
            "employment": employment,
            "tax_regime": tax_regime,
            "state": state,
            "encrypted_income": enc_income,
            "encrypted_gains": enc_gains,
            "annual_income": income,
            "capital_gains": capital_gains,
            "default_profile": len(PROFILES_DB) == 0,
            "created_at": "2026-08-02",
        }
        PROFILE_ID_COUNTER += 1
        PROFILES_DB.append(profile)

        return UserProfileResponse(
            id=profile["id"],
            user_id=user_id,
            display_name=display_name,
            employment=employment,
            tax_regime=tax_regime,
            state=state,
            annual_income=income,
            capital_gains=capital_gains,
            default_profile=profile["default_profile"],
            created_at=profile["created_at"],
        )

    def get_profiles(self, user_id: int) -> List[UserProfileResponse]:
        user_profs = [p for p in PROFILES_DB if p["user_id"] == user_id]
        if not user_profs:
            return [
                UserProfileResponse(
                    id=1,
                    user_id=user_id,
                    display_name="Primary Citizen Profile",
                    employment="salaried",
                    tax_regime="new",
                    state="Maharashtra",
                    annual_income=1200000.0,
                    capital_gains=0.0,
                    default_profile=True,
                    created_at="2026-08-02",
                )
            ]
        return [
            UserProfileResponse(
                id=p["id"],
                user_id=p["user_id"],
                display_name=p["display_name"],
                employment=p["employment"],
                tax_regime=p["tax_regime"],
                state=p["state"],
                annual_income=profile_encryption.decrypt_val(p["encrypted_income"]),
                capital_gains=profile_encryption.decrypt_val(p["encrypted_gains"]),
                default_profile=p["default_profile"],
                created_at=p["created_at"],
            )
            for p in user_profs
        ]

auth_service = AuthService()
