import hashlib

class ChecksumEngine:
    """Generates SHA-256 checksums to prevent re-indexing of duplicate statutory documents."""

    def compute_sha256(self, content: bytes) -> str:
        return hashlib.sha256(content).hexdigest()

checksum_engine = ChecksumEngine()
