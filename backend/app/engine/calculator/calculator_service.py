from typing import Dict, Any
from .profile_validator import profile_validator
from .impact_engine import impact_engine

class CalculatorService:
    def calculate_impact(self, profile: Dict[str, Any]) -> Dict[str, Any]:
        is_valid, errors = profile_validator.validate(profile)
        if not is_valid:
            return {"error": "Invalid profile", "details": errors}

        return impact_engine.evaluate(profile)

calculator_service = CalculatorService()
