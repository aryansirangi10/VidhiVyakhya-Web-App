import pytest
from app.evaluator import calculate_slab_tax, get_marginal_rate, evaluate_bill_impact
from app.models import Rule

def test_calculate_slab_tax():
    # Slabs: 0-3L @ 0%, 3-7L @ 5%, 7-10L @ 10%, 10L+ @ 15%
    slabs = [
        [300000, 0.00],
        [700000, 0.05],
        [1000000, 0.10],
        [None, 0.15]
    ]
    
    # 2.5L income -> should be 0 tax
    assert calculate_slab_tax(250000, slabs) == 0.0
    
    # 5L income -> tax on 2L @ 5% = 10000
    assert calculate_slab_tax(500000, slabs) == 10000.0
    
    # 8L income -> tax on 4L @ 5% (20000) + tax on 1L @ 10% (10000) = 30000
    assert calculate_slab_tax(800000, slabs) == 30000.0

def test_get_marginal_rate():
    slabs = [
        [300000, 0.00],
        [700000, 0.05],
        [1000000, 0.10],
        [None, 0.15]
    ]
    assert get_marginal_rate(250000, slabs) == 0.00
    assert get_marginal_rate(500000, slabs) == 0.05
    assert get_marginal_rate(850000, slabs) == 0.10
    assert get_marginal_rate(1200000, slabs) == 0.15

class DummyRule:
    def __init__(self, id, clause_number, clause_text, rule_type, condition_json, formula_json, source_span=None):
        self.id = id
        self.clause_number = clause_number
        self.clause_text = clause_text
        self.rule_type = rule_type
        self.condition_json = condition_json
        self.formula_json = formula_json
        self.source_span = source_span or {"page": 1}

def test_evaluate_standard_deduction():
    # Salaried standard deduction change from 50k to 75k
    rule = DummyRule(
        id=1,
        clause_number="Clause 4",
        clause_text="Standard deduction raised to 75000",
        rule_type="standard_deduction",
        condition_json={"tax_regime": "new", "employment_category": "salaried"},
        formula_json={"old_deduction": 50000, "new_deduction": 75000}
    )
    
    # Profile triggers rule (income 12L salaried new regime)
    profile = {
        "annual_income": 1200000,
        "age": 30,
        "tax_regime": "new",
        "state": "Maharashtra",
        "employment_category": "salaried"
    }
    
    res = evaluate_bill_impact(profile, [rule])
    # Marginal rate at 12L is 15% (new slabs: 10-12L @ 15%)
    # Savings = 25000 * 15% * 1.04 = 3900
    assert res["total_impact"] == 3900.0
    assert len(res["triggered_rules"]) == 1
    
    # Old regime profile -> should not trigger new regime rule
    old_profile = profile.copy()
    old_profile["tax_regime"] = "old"
    res_old = evaluate_bill_impact(old_profile, [rule])
    assert res_old["total_impact"] == 0.0

def test_evaluate_capital_gains():
    # LTSG rate 10% -> 12.5%, exemption 100k -> 125k
    rule = DummyRule(
        id=2,
        clause_number="Clause 22",
        clause_text="LTSG equity increased to 12.5%",
        rule_type="capital_gains",
        condition_json={},
        formula_json={"old_rate": 0.10, "new_rate": 0.125, "old_exemption": 100000, "new_exemption": 125000}
    )
    
    # 2 Lakh LTCG gains
    profile = {
        "annual_income": 800000,
        "age": 30,
        "tax_regime": "new",
        "state": "Maharashtra",
        "employment_category": "salaried",
        "equity_ltsg": 200000
    }
    
    # Old Tax: (200000 - 100000) * 10% = 10000
    # New Tax: (200000 - 125000) * 12.5% = 9375
    # Savings = (10000 - 9375) * 1.04 = 650
    res = evaluate_bill_impact(profile, [rule])
    assert res["total_impact"] == 650.0
