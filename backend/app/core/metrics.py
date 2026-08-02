from typing import Dict, Any

class PrometheusMetrics:
    def __init__(self):
        self.request_count = 0
        self.cache_hits = 0
        self.cache_misses = 0

    def record_request(self):
        self.request_count += 1

    def record_cache_hit(self):
        self.cache_hits += 1

    def record_cache_miss(self):
        self.cache_misses += 1

    def get_summary(self) -> Dict[str, Any]:
        total = self.cache_hits + self.cache_misses
        hit_ratio = (self.cache_hits / total) if total > 0 else 1.0
        return {
            "total_requests": self.request_count,
            "cache_hits": self.cache_hits,
            "cache_misses": self.cache_misses,
            "cache_hit_ratio": round(hit_ratio, 2),
        }

metrics = PrometheusMetrics()
