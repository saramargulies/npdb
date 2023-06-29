from fastapi import APIRouter, Depends
from models import VisitedList, VisitedListItemIn, VisitedListItemOut
from .authenticator import authenticator
from queries.visited import VisitedListQueries

router = APIRouter()


@router.get("/api/visited-lists/mine", response_model=VisitedList)
def visited_lists_parks_for_current_account(
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: VisitedListQueries = Depends(),
):
    return {
        "visited_list_items": queries.visited_list_for_account(
            account_id=account_data["id"]
        )
    }


@router.post("/api/visited-lists", response_model=VisitedListItemOut)
def create_visited_list_item(
    visited_list_item_in: VisitedListItemIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: VisitedListQueries = Depends(),
):
    return queries.create(
        visited_list_item_in=visited_list_item_in, account_id=account_data["id"]
    )


@router.delete("/api/visited-lists/{visited_list_item_id}")
def delete_visited_list_item(
    visited_list_item_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: VisitedListQueries = Depends(),
):
    return queries.delete(
        visited_list_item_id=visited_list_item_id, account_id=account_data["id"]
    )
