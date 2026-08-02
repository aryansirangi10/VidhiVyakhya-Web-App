from .constants import CESS_RATE

class CessEngine:
    def compute(self, tax_plus_surcharge: float) -> float:
        return round(tax_plus_surcharge * CESS_RATE, 2)

cess_engine = CessEngine()
