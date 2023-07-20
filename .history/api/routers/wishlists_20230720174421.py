from fastapi import APIRouter, Depends
from models import Wishlist, WishlistItemIn, WishlistItemOut
from authenticator import authenticator
from queries.wishlists import WishlistQueries


router = APIRouter()


@router.get("/api/wishlists", response_model=Wishlist)
def wishlisted_parks_for_current_account(
    visited: bool | None = None,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WishlistQueries = Depends(),
):
    return {
        "wishlist_items": queries.wishlist_for_account(
            visited, account_id=account_data["id"]
        )
    }


@router.post("/api/wishlists", response_model=WishlistItemOut)
def create_wishlist_item(
    wishlist_item_in: WishlistItemIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WishlistQueries = Depends(),
):
    return queries.create(
        wishlist_item_in=wishlist_item_in, account_id=account_data["id"]
    )


@router.delete("/api/wishlists/{wishlist_item_id}")
def delete_wishlist_item(
    wishlist_item_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WishlistQueries = Depends(),
):
    return queries.delete(
        wishlist_item_id=wishlist_item_id, account_id=account_data["id"]
    )


@router.put("/api/wishlists/{wishlist_item_id}")
def mark_as_visited(
    wishlist_item_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: WishlistQueries = Depends(),
):
    return queries.mark_visited(
        wishlist_item_id=wishlist_item_id, account_id=account_data["id"]
    )
    # if wishlist_item_id is None:
    #     raise HTTPException(status_code=404, detail="Item not found")
    # return wishlist_item_id
