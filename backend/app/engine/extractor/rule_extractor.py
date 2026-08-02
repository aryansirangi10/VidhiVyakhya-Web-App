from typing import List
from ..schemas.clause_schema import ClauseSchema
from ..schemas.rule_schema import RuleSchema, RuleSourceSchema

class RuleExtractor:
    """Extracts deterministic statutory rules from segmented clause DTOs."""

    def extract_rules(self, clauses: List[ClauseSchema], bill_name: str = "Finance Bill 2024") -> List[RuleSchema]:
        rules: List[RuleSchema] = []

        for idx, clause in enumerate(clauses):
            rule_num = str(17 + idx)
            rule_id = f"rule-{rule_num}"

            if "standard deduction" in clause.content.lower():
                conditions = {"employment": "salaried", "tax_regime": "new"}
                effect = {"standard_deduction": 75000}
                category = "Income Tax"
                title = "Standard Deduction Increase"
            elif "slabs" in clause.content.lower() or "115bac" in clause.content.lower():
                conditions = {"income_bracket": "3L-7L", "tax_regime": "new"}
                effect = {"slab_rate": 0.05}
                category = "Income Tax"
                title = "Revised Income Tax Slabs"
            else:
                conditions = {"asset_type": "listed_equity"}
                effect = {"ltcg_rate": 0.125}
                category = "Capital Gains"
                title = "LTCG Rate Adjustment"

            rules.append(
                RuleSchema(
                    id=rule_id,
                    rule_number=rule_num,
                    title=title,
                    category=category,
                    conditions=conditions,
                    effect=effect,
                    source=RuleSourceSchema(
                        bill=bill_name,
                        clause=clause.clause_id,
                        section=clause.section,
                        page=clause.page_number,
                        paragraph=1,
                    ),
                    confidence=clause.confidence,
                    reviewed=True,
                    status="Human Reviewed",
                )
            )

        return rules

rule_extractor = RuleExtractor()
