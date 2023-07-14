from fastapi.testclient import TestClient
from main import app
from queries.wishlists import WishlistQueries
from models import WishlistItemIn
from authenticator import authenticator

client = TestClient(app)


def fake_get_current_account_data():
    return {"id": "1234", "username": "fakeuser"}


class FakeWishlistQueries:
    def wishlist_for_account(self, account_id: str):
        return [
            {
                "id": "64b082d107a5be5f5ec35779",
                "fullName": "string",
                "states": "string",
                "visited": False,
            }
        ]

    def create(self, wishlist_item_in: WishlistItemIn, account_id: str):
        item = wishlist_item_in.dict()
        item["account_id"] = account_id
        item["id"] = "55555"
        return item

    def delete(self, wishlist_item_id: str, account_id: str):
        return True

    def mark_visited(self, wishlist_item_id: str, account_id: str):
        result = 


def test_get_all_wishlists():
    app.dependency_overrides[WishlistQueries] = FakeWishlistQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    result = client.get("/api/wishlists")
    data = result.json()
    print(result, result.status_code, data)

    assert result.status_code == 200
    assert data == {
        "wishlist_items": [
            {
                "id": "64b082d107a5be5f5ec35779",
                "fullName": "string",
                "states": "string",
                "visited": False,
            }
        ]
    }


def test_post_wishlists():
    app.dependency_overrides[WishlistQueries] = FakeWishlistQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data
    wishlist_item_in = {
        "fullName": "string",
        "states": "string",
        "visited": False,
    }

    result = client.post("/api/wishlists", json=wishlist_item_in)
    data = result.json()
    assert data == {
        "fullName": "string",
        "id": "55555",
        "states": "string",
        "visited": False,
    }
    assert result.status_code == 200


def test_delete_wishlists():
    app.dependency_overrides[WishlistQueries] = FakeWishlistQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    result = client.delete("/api/wishlists/55555")
    data = result.json()

    assert result.status_code == 200
    assert data == True


def test_put_wishlists():
    app.dependency_overrides[WishlistQueries] = FakeWishlistQueries
    app.dependency_overrides[authenticator.get_current_account_data] = fake_get_current_account_data

    assert 1 == 1
