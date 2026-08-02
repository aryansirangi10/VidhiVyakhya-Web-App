import pytest
from app.engine.calculator import tax_engine, impact_engine, calculator_service

def test_new_regime_tax_post_2024():
    # Income ₹12L - ₹75k Std Deduction = ₹11.25L taxable
    # 0-3L: 0
    # 3L-7L: 5% of 4L = 20,000
    # 7L-10L: 10% of 3L = 30,000
    # 10L-11.25L: 15% of 1.25L = 18,750
    # Total = 68,750
    tax = tax_engine.compute_new_regime_tax_post_2024(1125000)
    assert tax == 68750.0

def test_impact_engine_evaluation():
    profile = {
        "annualIncome": 1200000,
        "employment": "salaried",
        "taxRegime": "new",
        "age": 32,
    }
    result = impact_engine.evaluate(profile)
    assert result["difference"] > 0
    assert "breakdown" in result
    assert len(result["matchedRules"]) > 0

def test_calculator_service_validation():
    invalid_profile = {"annualIncome": -5000}
    res = calculator_service.calculate_impact(invalid_profile)
    assert "error" in res
