from typing import Dict, Any, List, Tuple

class ProfileValidator:
    """Validates user financial profile attributes before tax computation."""

    def validate(self, profile: Dict[str, Any]) -> Tuple[bool, List[str]]:
        errors: List[str] = []

        income = profile.get("annualIncome", profile.get("annual_income", 0))
        age = profile.get("age", 30)
        employment = profile.get("employment", "salaried")
        regime = profile.get("taxRegime", profile.get("tax_regime", "new"))

        if income < 0:
            errors.append("Annual income cannot be negative.")
        if age < 18 or age > 120:
            errors.append("Age must be between 18 and 120.")
        if employment not in ["salaried", "business", "professional", "freelance"]:
            errors.append("Invalid employment type.")
        if regime not in ["new", "old"]:
            errors.append("Tax regime must be 'new' or 'old'.")

        return (len(errors) == 0, errors)

profile_validator = ProfileValidator()
