from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_me_requires_auth():
    response = client.get("/me")
    assert response.status_code == 401


def test_partner_profile_requires_auth():
    response = client.get("/partner-profile")
    assert response.status_code == 401
