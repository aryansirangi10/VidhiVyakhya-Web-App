import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.ai.rules.validator import rule_validator
from app.ai.rules.extractor import rule_extractor
from app.ai.quality.hallucination import hallucination_checker

client = TestClient(app)

def test_rule_json_validation():
    valid_rule = {
        "rule_id": "r-1",
        "rule_type": "Deduction",
        "conditions": {},
        "calculation": {},
        "confidence": 0.98,
        "source": {"clause": "Clause 4"},
    }
    assert rule_validator.validate_rule(valid_rule) == True

def test_rule_extraction():
    rules = rule_extractor.extract_rules_from_clause("Standard deduction is increased to ₹75,000")
    assert len(rules) > 0
    assert rules[0]["confidence"] >= 0.95

def test_hallucination_checker():
    check = hallucination_checker.check_response(
        "Standard deduction is increased to ₹75,000 [Finance Bill 2024 • Clause 4].",
        [{"text": "Standard deduction..."}],
    )
    assert check["grounded"] == True
    assert check["hallucination_rate"] == 0.0

def test_ai_extract_api():
    res = client.post("/api/v1/ai/extract", json={"clause_text": "Standard deduction increased to ₹75,000."})
    assert res.status_code == 200
    assert "extracted_rules" in res.json()
