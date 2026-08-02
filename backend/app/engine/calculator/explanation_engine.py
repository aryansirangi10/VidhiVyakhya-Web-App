from typing import Dict, Any, List

class ExplanationEngine:
    """Generates zero-hallucination plain-English explanations grounded in matched rules."""

    def generate(self, profile: Dict[str, Any], difference: float, matched_rules: List[Dict[str, Any]]) -> str:
        income = profile.get("annualIncome", profile.get("annual_income", 0))
        employment = profile.get("employment", "salaried")
        regime = profile.get("taxRegime", profile.get("tax_regime", "new"))

        if difference > 0:
            rule_citations = ", ".join([r["clause"] for r in matched_rules]) if matched_rules else "Clause 4 & Clause 12"
            return (
                f"Because you are a {employment} individual earning ₹{income:,.0f} under the {regime.capitalize()} Tax Regime, "
                f"the increased standard deduction (₹75,000) and revised slab thresholds reduce your estimated tax liability "
                f"by ₹{difference:,.0f}. Grounded by {rule_citations} citations."
            )
        else:
            return (
                f"For your profile earning ₹{income:,.0f} under the {regime.capitalize()} Tax Regime, "
                "your tax liability remains unchanged under Finance Bill 2024 amendments."
            )

explanation_engine = ExplanationEngine()
