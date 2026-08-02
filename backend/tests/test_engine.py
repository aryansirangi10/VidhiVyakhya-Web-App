import pytest
from app.engine.pipeline import pipeline
from app.engine.parser import pdf_parser, clause_splitter
from app.engine.extractor import rule_extractor
from app.engine.validator import rule_validator, confidence_engine

def test_pdf_parser_extraction():
    pages = pdf_parser.extract_text("/documents/finance_bill_2024.pdf")
    assert len(pages) > 0
    assert 14 in pages

def test_clause_splitter():
    pages = {14: "Clause 4. Standard deduction increase under Section 16(ia)."}
    clauses = clause_splitter.split_clauses(pages)
    assert len(clauses) > 0
    assert clauses[0].clause_id == "Clause 4"

def test_rule_extraction_pipeline():
    result = pipeline.process_bill("/documents/finance_bill_2024.pdf", bill_id=1)
    assert result["bill_id"] == 1
    assert len(result["extracted_rules"]) > 0
    assert result["summary"]["status"] == "COMPLETED"

def test_confidence_engine():
    score = confidence_engine.compute_score(llm_score=0.95, schema_valid=True, citation_matched=True, is_reviewed=True)
    assert score >= 0.90
