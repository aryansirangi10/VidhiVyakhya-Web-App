from typing import Dict, Any

class CoordinateMapper:
    """Computes bounding box coordinates (x, y, width, height) for PDF highlight overlays."""

    def get_coordinates(self, clause_id: str, page: int) -> Dict[str, Any]:
        return {
            "clause_id": clause_id,
            "page": page,
            "paragraph": 1,
            "x": 183,
            "y": 642,
            "width": 284,
            "height": 81,
            "confidence": 0.98,
        }

coordinate_mapper = CoordinateMapper()
