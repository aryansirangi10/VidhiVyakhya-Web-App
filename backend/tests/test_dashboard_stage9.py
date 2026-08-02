import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_dashboard():
    res = client.get("/api/v1/dashboard")
    assert res.status_code == 200
    data = res.json()
    assert "summary" in data
    assert "savings_trend" in data
    assert data["summary"]["estimated_annual_savings"] == 18450.0

def test_dashboard_summary():
    res = client.get("/api/v1/dashboard/summary")
    assert res.status_code == 200
    data = res.json()
    assert data["bills_tracked_count"] == 14

def test_dashboard_analytics():
    res = client.get("/api/v1/dashboard/analytics")
    assert res.status_code == 200
    data = res.json()
    assert data["calculations"] == 58
