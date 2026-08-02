from .constants import SURCHARGE_50L, SURCHARGE_1CR, SURCHARGE_2CR

class SurchargeEngine:
    def compute(self, income: float, base_tax: float) -> float:
        if income > SURCHARGE_2CR:
            return base_tax * 0.25
        elif income > SURCHARGE_1CR:
            return base_tax * 0.15
        elif income > SURCHARGE_50L:
            return base_tax * 0.10
        return 0.0

surcharge_engine = SurchargeEngine()
