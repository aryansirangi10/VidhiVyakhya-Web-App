import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.ai.embeddings.embedding_service import embedding_service
from app.ai.assistant.assistant_service import assistant_service

client = TestClient(app)

def test_embedding_generation():
    vec = embedding_service.generate_embedding("Standard deduction under Section 16(ia)")
    assert len(vec) == 384
    assert sum(x*x for x in vec) > 0.9

def test_assistant_service_chat():
    res = assistant_service.chat("How does standard deduction affect me?")
    assert "answer" in res
    assert len(res["citations"]) > 0
    assert res["confidence"] >= 0.90

def test_assistant_chat_api():
    res = client.post("/api/v1/assistant/chat", json={"question": "What is the standard deduction?"})
    assert res.status_code == 200
    data = res.json()
    assert "citations" in data

def test_assistant_compare_api():
    res = client.post("/api/v1/assistant/compare", json={"bill_a": "Finance Bill 2024", "bill_b": "Finance Bill 2025"})
    assert res.status_code == 200
    assert len(res.json()["changes"]) > 0
