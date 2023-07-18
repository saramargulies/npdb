from fastapi.testclient import TestClient
from main import app
from queries.reviews import ReviewQueries
from models import ReviewIn
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {"id": "1234", "username": "fakeuser"}


class FakeReviewQueries:
    def reviews_for_account(self, account_id: str):
        return [
            {
                "id": "64b6e161d6811a123ce06c6b",
                "parkDetails": {
                    "parkName": "string",
                    "parkCode": "string",
                },
                "review": "string",
                "rating": 0,
                "account_id": "64adebddcc01c264c551b480",
                "username": "string",
            }
        ]

    def reviews_for_park(self, parkCode: str):
        return [
            {
                "id": "64b6e161d6811a123ce06c6b",
                "parkDetails": {
                    "parkName": "string",
                    "parkCode": "string",
                },
                "review": "string",
                "rating": 0,
                "account_id": "64adebddcc01c264c551b480",
                "username": "string",
            }
        ]

    def create(self, review_in: ReviewIn, account_id: str, username: str):
        review = review_in.dict()
        review["account_id"] = account_id
        review["id"] = "64b062b3476db219fdab8b86"
        review["username"] = "fakeuser"
        return review

    def delete(self, review_id: str, account_id: str):
        return True

    def edit_review(
        self, review_id: str, review_in: ReviewIn, account_id: str
    ):
        return {
            "_id": "64b1b2d2f3adc678b83c320c",
            "parkDetails": {"parkName": "string", "parkCode": "string"},
            "rating": 0,
            "review": "string",
            "account_id": account_id,
            "username": "fakeuser",
        }


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
                "id": "64b6e161d6811a123ce06c6b",
                "parkDetails": {
                    "parkName": "string",
                    "parkCode": "string",
                },
                "review": "string",
                "rating": 0,
                "account_id": "64adebddcc01c264c551b480",
                "username": "string",
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
                "id": "64b6e161d6811a123ce06c6b",
                "parkDetails": {
                    "parkName": "string",
                    "parkCode": "string",
                },
                "review": "string",
                "rating": 0,
                "account_id": "64adebddcc01c264c551b480",
                "username": "string",
            }
        ]
    }


def test_post_reviews():
    app.dependency_overrides[ReviewQueries] = FakeReviewQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    review_in = {
        "parkDetails": {"parkName": "string", "parkCode": "string"},
        "review": "string",
        "rating": 0,
    }

    result = client.post("/api/reviews", json=review_in)
    data = result.json()
    assert data == {
        "id": "64b062b3476db219fdab8b86",
        "parkDetails": {"parkName": "string", "parkCode": "string"},
        "review": "string",
        "rating": 0,
        "account_id": "1234",
        "username": "fakeuser",
    }
    assert result.status_code == 200


def test_delete_reviews():
    app.dependency_overrides[ReviewQueries] = FakeReviewQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    result = client.delete("/api/reviews/64b062b3476db219fdab8b86")
    data = result.json()

    assert result.status_code == 200
    assert data is True


def test_put_reviews():
    app.dependency_overrides[ReviewQueries] = FakeReviewQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    review_in = {
        "parkDetails": {"parkName": "string", "parkCode": "string"},
        "review": "string",
        "rating": 0,
    }
    result = client.put("api/reviews/64b062b3476db219fdab8b86", json=review_in)
    data = result.json()

    assert data == {
        "_id": "64b1b2d2f3adc678b83c320c",
        "parkDetails": {"parkName": "string", "parkCode": "string"},
        "rating": 0,
        "review": "string",
        "account_id": "1234",
        "username": "fakeuser",
    }

    assert result.status_code == 200
