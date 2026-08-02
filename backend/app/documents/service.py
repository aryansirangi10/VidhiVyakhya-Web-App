from typing import List, Dict, Any

class DocumentService:
    def __init__(self):
        self.documents = [
            {
                "id": 1,
                "title": "Finance Bill 2024 (Bill No. 112)",
                "document_type": "Bill",
                "ministry": "Ministry of Finance",
                "category": "Taxation",
                "status": "Passed",
                "bill_number": "112 of 2024",
                "introduced_date": "2024-02-01",
                "published_date": "2024-07-23",
                "language": "English",
                "pages": 148,
                "reading_time": 45,
                "summary": "Introduces revised Section 115BAC tax slabs, increases standard deduction to ₹75,000, and adjusts LTCG rates.",
                "confidence": 0.98,
                "bookmarks_count": 1420,
                "views_count": 18900,
            },
            {
                "id": 2,
                "title": "Digital Personal Data Protection Act 2023",
                "document_type": "Act",
                "ministry": "Ministry of Electronics & IT",
                "category": "Privacy",
                "status": "Implemented",
                "bill_number": "Act No. 22 of 2023",
                "introduced_date": "2023-08-03",
                "published_date": "2023-08-11",
                "language": "English",
                "pages": 44,
                "reading_time": 18,
                "summary": "Establishes Data Protection Board guidelines and non-compliance penalties up to ₹250 Crore.",
                "confidence": 0.96,
                "bookmarks_count": 980,
                "views_count": 14200,
            },
            {
                "id": 3,
                "title": "CBDT Circular No. 10/2024 - TDS Guidelines",
                "document_type": "Circular",
                "ministry": "Ministry of Finance",
                "category": "Tax Compliance",
                "status": "Implemented",
                "bill_number": "CBDT-CIRC-10-2024",
                "introduced_date": "2024-08-01",
                "published_date": "2024-08-01",
                "language": "English",
                "pages": 12,
                "reading_time": 8,
                "summary": "Clarification on TDS rates under Section 194J and Section 194C for corporate entities.",
                "confidence": 0.99,
                "bookmarks_count": 640,
                "views_count": 8700,
            },
        ]

    def list_documents(self, doc_type: str = None, query: str = None) -> List[Dict[str, Any]]:
        results = self.documents
        if doc_type and doc_type.lower() != "all":
            results = [d for d in results if d["document_type"].lower() == doc_type.lower()]
        if query:
            q = query.lower()
            results = [d for d in results if q in d["title"].lower() or q in d["summary"].lower()]
        return results

    def get_document_by_id(self, doc_id: int) -> Dict[str, Any]:
        for d in self.documents:
            if d["id"] == doc_id:
                return d
        return self.documents[0]

    def get_trending_documents(self) -> List[Dict[str, Any]]:
        return sorted(self.documents, key=lambda x: x["views_count"], reverse=True)

    def get_related_documents(self, doc_id: int) -> List[Dict[str, Any]]:
        return [
            {
                "id": 3,
                "title": "CBDT Circular No. 10/2024",
                "relationship_type": "clarifies",
                "confidence": 0.95,
            },
            {
                "id": 2,
                "title": "Digital Personal Data Protection Act 2023",
                "relationship_type": "references",
                "confidence": 0.88,
            },
        ]

    def compare_documents(self, doc_a: str, doc_b: str) -> Dict[str, Any]:
        return {
            "doc_a": doc_a,
            "doc_b": doc_b,
            "added_clauses": ["Clause 4 (Standard Deduction ₹75k)", "Clause 12 (115BAC Slabs)"],
            "removed_clauses": ["Old Indexation Benefit under Sec 112A"],
            "modified_rules": ["LTCG tax rate adjusted from 10% to 12.5%"],
            "net_impact_summary": "Net annual savings increased by ₹18,450 for salaried income brackets.",
        }

document_service = DocumentService()
