from typing import List, Dict, Any

class CitationBuilder:
    def format_citation(self, clause: Dict[str, Any]) -> str:
        return f"{clause['bill']} • {clause['clause_id']} • {clause['section']} (Page {clause['page']}, Para {clause['paragraph']})"

citation_builder = CitationBuilder()
