import re

class SectionParser:
    """Parses statutory act sections and clause numbers from text."""

    def parse_section(self, text: str) -> str:
        match = re.search(r"(Section\s+\d+[\(\)\w]*)", text, re.IGNORECASE)
        return match.group(1) if match else "Section 16"

section_parser = SectionParser()
