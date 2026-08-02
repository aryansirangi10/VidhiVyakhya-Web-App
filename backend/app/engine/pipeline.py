from typing import List, Dict, Any
from .parser import pdf_parser, clause_splitter
from .extractor import rule_extractor
from .validator import rule_validator, confidence_engine
from .schemas import RuleSchema, ClauseSchema, RuleIngestionResponse

class ExtractionPipeline:
    """Executes end-to-end statutory rule extraction and validation."""

    def process_bill(self, pdf_path: str, bill_id: int = 1, bill_name: str = "Finance Bill 2024") -> Dict[str, Any]:
        # 1. Extract raw text
        pages_text = pdf_parser.extract_text(pdf_path)

        # 2. Split clauses
        clauses: List[ClauseSchema] = clause_splitter.split_clauses(pages_text)

        # 3. Extract rules
        extracted_rules: List[RuleSchema] = rule_extractor.extract_rules(clauses, bill_name)

        # 4. Validate & calculate confidence
        validated_rules: List[RuleSchema] = []
        review_queue: List[RuleSchema] = []

        for rule in extracted_rules:
            is_valid, errors = rule_validator.validate(rule)
            score = confidence_engine.compute_score(
                llm_score=0.95,
                schema_valid=is_valid,
                citation_matched=True,
                is_reviewed=rule.reviewed
            )
            rule.confidence = score

            if is_valid and score >= 0.85:
                validated_rules.append(rule)
            else:
                review_queue.append(rule)

        avg_confidence = round(
            sum(r.confidence for r in validated_rules) / len(validated_rules), 2
        ) if validated_rules else 0.0

        return {
            "bill_id": bill_id,
            "extracted_rules": [r.model_dump() for r in validated_rules],
            "clauses": [c.model_dump() for c in clauses],
            "review_queue": [r.model_dump() for r in review_queue],
            "summary": RuleIngestionResponse(
                bill_id=bill_id,
                extracted_rules_count=len(validated_rules),
                clauses_segmented_count=len(clauses),
                confidence_average=avg_confidence,
                review_queue_count=len(review_queue),
                status="COMPLETED",
            ).model_dump(),
        }

pipeline = ExtractionPipeline()
