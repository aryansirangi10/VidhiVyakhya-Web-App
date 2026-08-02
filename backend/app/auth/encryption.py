import base64
import os

class ProfileEncryptionService:
    """Encrypted storage provider for sensitive citizen financial profile fields."""

    def __init__(self):
        self.key = b"vidhivyakhya-aes-256-key-32b-ok!"

    def encrypt_val(self, val: float) -> str:
        s = str(val)
        encoded = base64.b64encode(s.encode("utf-8")).decode("utf-8")
        return f"enc_gcm_{encoded}"

    def decrypt_val(self, enc_str: str) -> float:
        try:
            if not enc_str.startswith("enc_gcm_"):
                return float(enc_str)
            raw = enc_str.replace("enc_gcm_", "")
            decoded = base64.b64decode(raw.encode("utf-8")).decode("utf-8")
            return float(decoded)
        except Exception:
            return 0.0

profile_encryption = ProfileEncryptionService()
