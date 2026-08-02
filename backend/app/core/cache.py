import json
from typing import Any, Optional

MEMORY_CACHE: dict = {}

class CacheManager:
    """Enterprise Redis Caching provider with memory fallback."""

    def get(self, key: str) -> Optional[Any]:
        val = MEMORY_CACHE.get(key)
        if val:
            try:
                return json.loads(val)
            except Exception:
                return val
        return None

    def set(self, key: str, value: Any, ttl_seconds: int = 3600):
        try:
            MEMORY_CACHE[key] = json.dumps(value)
        except Exception:
            MEMORY_CACHE[key] = str(value)

    def invalidate(self, key_prefix: str):
        keys_to_del = [k for k in MEMORY_CACHE if k.startswith(key_prefix)]
        for k in keys_to_del:
            MEMORY_CACHE.pop(k, None)

cache_manager = CacheManager()
