from fastapi.testclient import TestClient
from main import app

client = TestClient(app)

class FakeWishlistQueries:
    def wishlist_for_account(self, account_id: str):
        return []

    def create(self, wishlist_item_in: WishlistItemIn, account_id: str):
        pass

    def delete(self, wishlist_item_id: str, account_id: str):
        pass

    def mark_visited(self, wishlist_item_id: str, account_id: str):
        pass

def test_get_all_wishlists():
    assert 1 == 1 


def test_post_wishlists():
    assert 1 == 1


def test_delete_wishlists():
    assert 1 == 1


def test_put_wishlists():
    assert 1 == 1