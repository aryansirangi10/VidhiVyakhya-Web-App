from typing import Dict, Any

class TaxEngine:
    """Deterministic Statutory Tax Calculator for Indian Income Tax Regimes."""

    def compute_new_regime_tax_post_2024(self, taxable_income: float) -> float:
        """Computes tax under Finance Bill 2024 revised slabs:
        - Up to ₹3,00,000: Nil
        - ₹3,00,001 to ₹7,00,000: 5%
        - ₹7,00,001 to ₹10,00,000: 10%
        - ₹10,00,001 to ₹12,00,000: 15%
        - ₹12,00,001 to ₹15,00,000: 20%
        - Above ₹15,00,000: 30%
        """
        if taxable_income <= 300000:
            return 0.0

        tax = 0.0
        if taxable_income > 1500000:
            tax += (taxable_income - 1500000) * 0.30
            taxable_income = 1500000
        if taxable_income > 1200000:
            tax += (taxable_income - 1200000) * 0.20
            taxable_income = 1200000
        if taxable_income > 1000000:
            tax += (taxable_income - 1000000) * 0.15
            taxable_income = 1000000
        if taxable_income > 700000:
            tax += (taxable_income - 700000) * 0.10
            taxable_income = 700000
        if taxable_income > 300000:
            tax += (taxable_income - 300000) * 0.05

        return round(tax, 2)

    def compute_new_regime_tax_pre_2024(self, taxable_income: float) -> float:
        """Computes tax under FY 2023-24 slabs."""
        if taxable_income <= 300000:
            return 0.0

        tax = 0.0
        if taxable_income > 1500000:
            tax += (taxable_income - 1500000) * 0.30
            taxable_income = 1500000
        if taxable_income > 1200000:
            tax += (taxable_income - 1200000) * 0.20
            taxable_income = 1200000
        if taxable_income > 900000:
            tax += (taxable_income - 900000) * 0.15
            taxable_income = 900000
        if taxable_income > 600000:
            tax += (taxable_income - 600000) * 0.10
            taxable_income = 600000
        if taxable_income > 300000:
            tax += (taxable_income - 300000) * 0.05

        return round(tax, 2)

tax_engine = TaxEngine()
