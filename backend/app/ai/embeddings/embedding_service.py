import hashlib
from typing import List

class EmbeddingService:
    """Generates 384-dimensional vector embeddings for statutory clauses."""

    def generate_embedding(self, text: str) -> List[float]:
        # Generate deterministic mock 384-dim normalized embedding vector
        h = hashlib.sha256(text.encode("utf-8")).hexdigest()
        raw = [int(h[i:i+2], 16) / 255.0 for i in range(0, 64, 2)]
        # Pad to 384 dimensions
        full_vec = (raw * 12)[:384]
        norm = sum(x*x for x in full_vec) ** 0.5
        return [round(x / norm, 4) for x in full_vec]

embedding_service = EmbeddingService()
