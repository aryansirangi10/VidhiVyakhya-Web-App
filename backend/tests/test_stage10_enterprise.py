import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.cache import cache_manager
from app.core.metrics import metrics

client = TestClient(app)

def test_cache_manager():
    cache_manager.set("test_key", {"status": "ok"})
    val = cache_manager.get("test_key")
    assert val["status"] == "ok"

def test_metrics_recorder():
    metrics.record_request()
    metrics.record_cache_hit()
    summary = metrics.get_summary()
    assert summary["total_requests"] >= 1

def test_health_endpoints():
    res = client.get("/health/database")
    assert res.status_code == 200
    assert res.json()["status"] == "HEALTHY"

    res_redis = client.get("/health/redis")
    assert res_redis.status_code == 200

    res_workers = client.get("/health/workers")
    assert res_workers.status_code == 200

def test_global_search_api():
    res = client.get("/api/v1/search?q=standard deduction")
    assert res.status_code == 200
    data = res.json()
    assert "bills" in data
    assert "rules" in data

def test_admin_metrics_api():
    res = client.get("/api/v1/admin/metrics")
    assert res.status_code == 200
    assert "total_requests" in res.json()
