from typing import List, Tuple
from ..schemas.rule_schema import RuleSchema

class RuleValidator:
    """Validates extracted statutory rules for schema compliance and sanity constraints."""

    def validate(self, rule: RuleSchema) -> Tuple[bool, List[str]]:
        errors: List[str] = []

        if not rule.id:
            errors.append("Rule ID is missing")
        if not rule.category:
            errors.append("Rule category is missing")
        if not rule.conditions:
            errors.append("Rule conditions dictionary is empty")
        if not rule.effect:
            errors.append("Rule effect dictionary is empty")
        if not rule.source or not rule.source.clause:
            errors.append("Rule citation source is missing or incomplete")

        return (len(errors) == 0, errors)

rule_validator = RuleValidator()
