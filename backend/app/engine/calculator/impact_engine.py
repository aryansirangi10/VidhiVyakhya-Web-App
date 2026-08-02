from typing import Dict, Any
from .tax_engine import tax_engine
from .surcharge import surcharge_engine
from .cess import cess_engine
from .rebate import rebate_engine
from .rule_matcher import rule_matcher
from .explanation_engine import explanation_engine
from .constants import OLD_REGIME_STANDARD_DEDUCTION, NEW_REGIME_STANDARD_DEDUCTION_POST_2024, NEW_REGIME_STANDARD_DEDUCTION_PRE_2024

class ImpactEngine:
    """Evaluates Before vs After statutory impact for a citizen profile."""

    def evaluate(self, profile: Dict[str, Any]) -> Dict[str, Any]:
        income = float(profile.get("annualIncome", profile.get("annual_income", 1200000)))
        employment = profile.get("employment", "salaried")
        regime = profile.get("taxRegime", profile.get("tax_regime", "new"))

        # Deductions
        std_deduction_before = OLD_REGIME_STANDARD_DEDUCTION if regime == "old" else NEW_REGIME_STANDARD_DEDUCTION_PRE_2024
        std_deduction_after = OLD_REGIME_STANDARD_DEDUCTION if regime == "old" else NEW_REGIME_STANDARD_DEDUCTION_POST_2024

        if employment != "salaried":
            std_deduction_before = 0
            std_deduction_after = 0

        taxable_before = max(0, income - std_deduction_before)
        taxable_after = max(0, income - std_deduction_after)

        # Tax calculations
        base_tax_before = tax_engine.compute_new_regime_tax_pre_2024(taxable_before)
        base_tax_after = tax_engine.compute_new_regime_tax_post_2024(taxable_after)

        rebate_before = rebate_engine.compute(taxable_before, base_tax_before, regime)
        rebate_after = rebate_engine.compute(taxable_after, base_tax_after, regime)

        net_base_before = max(0, base_tax_before - rebate_before)
        net_base_after = max(0, base_tax_after - rebate_after)

        surcharge_before = surcharge_engine.compute(income, net_base_before)
        surcharge_after = surcharge_engine.compute(income, net_base_after)

        cess_before = cess_engine.compute(net_base_before + surcharge_before)
        cess_after = cess_engine.compute(net_base_after + surcharge_after)

        total_tax_before = round(net_base_before + surcharge_before + cess_before)
        total_tax_after = round(net_base_after + surcharge_after + cess_after)

        difference = total_tax_before - total_tax_after

        matched_rules = rule_matcher.match_rules(profile)
        explanation = explanation_engine.generate(profile, difference, matched_rules)

        return {
            "before": total_tax_before,
            "after": total_tax_after,
            "difference": difference,
            "breakdown": {
                "baseTax": net_base_after,
                "cess": cess_after,
                "surcharge": surcharge_after,
                "rebate": rebate_after,
                "deduction": std_deduction_after,
            },
            "matchedRules": [r["rule_id"] for r in matched_rules],
            "citations": [r["clause"] for r in matched_rules],
            "explanation": explanation,
        }

impact_engine = ImpactEngine()
