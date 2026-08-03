from typing import Dict, Any

class RuleJSONValidator:
    """Validates that AI-extracted statutory rules strictly conform to deterministic JSON schema."""

    def validate_rule(self, rule_json: Dict[str, Any]) -> bool:
        required_keys = ["rule_id", "rule_type", "conditions", "calculation", "confidence", "source"]
        for k in required_keys:
            if k not in rule_json:
                return False
        return isinstance(rule_json.get("confidence"), (int, float)) and rule_json["confidence"] >= 0.50

rule_validator = RuleJSONValidator()
