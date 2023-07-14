from fastapi.testclient import TestClient
from main import app
from queries.reviews import ReviewQueries
from models import WishlistItemIn
from authenticator import authenticator

client = TestClient(app)

def fake_get_current_account_data():
    return {"id": "1234", "username": "fakeuser"}


class FakeReviewQueries:
    def reviews_for_account(self, account_id: str):
        return [
            {
                "id": "64b062b3476db219fdab8b86",
                "parkCode": "string",
                "review": "string",
                "rating": 0,
                "account_id": "64adebddcc01c264c551b480"
            }
        ]

    def reviews_for_park(self, parkCode: str):
        return [
            {
                "id": "64b062b3476db219fdab8b86",
                "parkCode": "string",
                "review": "string",
                "rating": 0,
                "account_id": "64adebddcc01c264c551b480"
            }
        ]


def test_get_all_user_reviews():
    app.dependency_overrides[ReviewQueries] = FakeReviewQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    result = client.get("/api/reviews")
    data = result.json()
    print(result, result.status_code, data)

    assert result.status_code == 200
    assert data == {
        "reviews": [
            {
                "id": "64b062b3476db219fdab8b86",
                "parkCode": "string",
                "review": "string",
                "rating": 0,
                "account_id": "64adebddcc01c264c551b480"
            }
        ]
    }


def test_get_all_park_reviews():
    app.dependency_overrides[ReviewQueries] = FakeReviewQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    result = client.get("/api/parks/alca/reviews")
    data = result.json()
    print(result, result.status_code, data)

    assert result.status_code == 200
    assert data == {
        "reviews": [
            {
                "id": "64b062b3476db219fdab8b86",
                "parkCode": "string",
                "review": "string",
                "rating": 0,
                "account_id": "64adebddcc01c264c551b480"
            }
        ]
    }
