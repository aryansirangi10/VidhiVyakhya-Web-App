import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.database import Base, get_db
from app.main import app

# Set up test database engine
SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Override database session dependency
def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    # Setup database schema before test run
    Base.metadata.create_all(bind=engine)
    # Seed bills
    from app.seed import seed_bills_and_rules
    with TestingSessionLocal() as db:
        seed_bills_and_rules(db)
    yield
    # Cleanup database schema after test run
    Base.metadata.drop_all(bind=engine)

def test_list_bills():
    res = client.get("/api/bills")
    assert res.status_code == 200
    data = res.json()
    assert len(data) >= 3
    assert any(b["title"] == "Finance Bill 2024" for b in data)

def test_calculate_anonymous():
    # Fetch Finance Bill ID
    bills_res = client.get("/api/bills")
    bill_id = [b["id"] for b in bills_res.json() if b["title"] == "Finance Bill 2024"][0]
    
    # Calculate for salaried 10L profile under new regime
    calc_res = client.post("/api/calculate", json={
        "bill_id": bill_id,
        "profile": {
            "annual_income": 1000000,
            "age": 30,
            "tax_regime": "new",
            "state": "Maharashtra",
            "employment_category": "salaried",
            "equity_ltsg": 0
        }
    })
    
    assert calc_res.status_code == 200
    data = calc_res.json()
    assert data["bill_id"] == bill_id
    assert "total_impact" in data
    # Standard deduction saves 25k * 10% * 1.04 = 2600
    # revised slabs saves 10k * 1.04 = 10400
    # Total savings should be 13000 rupees
    assert data["total_impact"] == 13000.0
    assert len(data["triggered_rules"]) == 2

def test_user_flow_auth_profiles_history():
    # 1. Register User
    reg_res = client.post("/api/auth/register", json={
        "email": "testuser@example.com",
        "password": "strongpassword123"
    })
    assert reg_res.status_code == 201

    # 2. Login User
    login_res = client.post("/api/auth/login", json={
        "email": "testuser@example.com",
        "password": "strongpassword123"
    })
    assert login_res.status_code == 200
    token = login_res.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 3. Create profile (AES-256 encrypted fields)
    profile_res = client.post("/api/profiles", headers=headers, json={
        "name": "Family Member",
        "profile_data": {
            "annual_income": 600000,
            "age": 28,
            "tax_regime": "new",
            "state": "Telangana",
            "employment_category": "salaried",
            "equity_ltsg": 0
        }
    })
    assert profile_res.status_code == 200
    profile_data = profile_res.json()
    assert profile_data["name"] == "Family Member"
    assert profile_data["profile_data"]["annual_income"] == 600000
    
    # 4. List profiles
    list_res = client.get("/api/profiles", headers=headers)
    assert list_res.status_code == 200
    assert len(list_res.json()) == 1

    # 5. Fetch Bills and Save History
    bills_res = client.get("/api/bills")
    bill_id = bills_res.json()[0]["id"]

    save_res = client.post("/api/history", headers=headers, json={
        "profile_id": profile_data["id"],
        "bill_id": bill_id,
        "calculated_impact": 5000.0,
        "explanation": "Test explanation savings",
        "details_json": {"triggered_rules": []}
    })
    assert save_res.status_code == 200

    # 6. Idempotency Check: Save same history again (should update/not duplicate)
    save_dup_res = client.post("/api/history", headers=headers, json={
        "profile_id": profile_data["id"],
        "bill_id": bill_id,
        "calculated_impact": 5200.0,
        "explanation": "Test updated savings",
        "details_json": {"triggered_rules": []}
    })
    assert save_dup_res.status_code == 200

    # 7. Check History list (length should be 1, showing upsert occurred)
    history_res = client.get("/api/history", headers=headers)
    assert history_res.status_code == 200
    history_data = history_res.json()
    assert len(history_data) == 1
    assert history_data[0]["calculated_impact"] == 5200.0
