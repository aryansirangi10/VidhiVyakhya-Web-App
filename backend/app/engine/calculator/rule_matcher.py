from typing import Dict, Any, List

class RuleMatcher:
    """Matches user profile attributes against statutory rules."""

    def match_rules(self, profile: Dict[str, Any]) -> List[Dict[str, Any]]:
        income = profile.get("annualIncome", profile.get("annual_income", 0))
        employment = profile.get("employment", "salaried")
        regime = profile.get("taxRegime", profile.get("tax_regime", "new"))

        matched = []

        if employment == "salaried" and regime == "new":
            matched.append({
                "rule_id": "rule-17",
                "title": "Standard Deduction Increase",
                "clause": "Clause 4",
                "section": "Section 16(ia)",
                "page": 14,
                "reason": "Salaried employee under New Tax Regime eligible for ₹75,000 deduction.",
                "confidence": 0.98,
            })

        if regime == "new" and income > 700000:
            matched.append({
                "rule_id": "rule-18",
                "title": "Revised Tax Slabs",
                "clause": "Clause 12",
                "section": "Section 115BAC",
                "page": 32,
                "reason": "Income exceeds ₹7,00,000; revised 10% & 15% slab brackets applied.",
                "confidence": 0.99,
            })

        return matched

rule_matcher = RuleMatcher()
