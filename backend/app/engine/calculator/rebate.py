from .constants import REBATE_LIMIT_NEW_REGIME, REBATE_LIMIT_OLD_REGIME

class RebateEngine:
    def compute(self, taxable_income: float, base_tax: float, regime: str = "new") -> float:
        limit = REBATE_LIMIT_NEW_REGIME if regime == "new" else REBATE_LIMIT_OLD_REGIME
        if taxable_income <= limit:
            return base_tax
        return 0.0

rebate_engine = RebateEngine()
