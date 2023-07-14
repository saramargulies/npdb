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
      "visited": false
    },
    {
      "id": "64b082dc07a5be5f5ec3577a",
      "fullName": "string",
      "states": "CO",
      "visited": false
    },
    {
      "id": "64b082e107a5be5f5ec3577b",
      "fullName": "string",
      "states": "CA",
      "visited": false
    }
  ]

    def create(self, wishlist_item_in: WishlistItemIn, account_id: str):
        pass

    def delete(self, wishlist_item_id: str, account_id: str):
        return True

    def mark_visited(self, wishlist_item_id: str, account_id: str):
        pass


def test_get_all_wishlists():
    app.dependency_overrides[WishlistQueries] = FakeWishlistQueries
    app.dependency_overrides[
        authenticator.get_current_account_data
    ] = fake_get_current_account_data

    result = client.get("/api/wishlists")
    data = result.json()
    print(result, result.status_code, data)

    assert result.status_code == 200
    assert data == {"wishlist_items": [{"parkCode": "amch"}]}


def test_post_wishlists():
    app.dependency_overrides[WishlistQueries] = FakeWishlistQueries
    assert 1 == 1


def test_delete_wishlists():
    app.dependency_overrides[WishlistQueries] = FakeWishlistQueries
    assert 1 == 1


def test_put_wishlists():
    app.dependency_overrides[WishlistQueries] = FakeWishlistQueries
    assert 1 == 1
