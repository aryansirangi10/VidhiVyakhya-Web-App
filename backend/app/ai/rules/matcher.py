from typing import List, Dict, Any

class RuleMatcher:
    """Matches citizen financial profiles with extracted statutory rules to trigger deterministic calculations."""

    def match_rules(self, profile: Dict[str, Any], rules: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        matched = []
        income = profile.get("annual_income", 1000000)
        is_salaried = profile.get("employment_category") == "salaried"

        for r in rules:
            if r.get("rule_type") == "Deduction" and is_salaried:
                matched.append(r)
            elif r.get("rule_type") == "Income Tax" and income > 300000:
                matched.append(r)
        return matched

rule_matcher = RuleMatcher()
