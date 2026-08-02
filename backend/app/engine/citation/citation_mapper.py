from typing import Dict, Any
from ..schemas.rule_schema import RuleSourceSchema

class CitationMapper:
    """Maps statutory rules back to raw parliamentary citations."""

    def build_citation(self, bill: str, clause: str, section: str, page: int, paragraph: int = 1) -> RuleSourceSchema:
        return RuleSourceSchema(
            bill=bill,
            clause=clause,
            section=section,
            page=page,
            paragraph=paragraph,
        )

citation_mapper = CitationMapper()
