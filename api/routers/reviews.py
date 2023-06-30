from models import ReviewIn, ReviewOut, ParkReviewsList, AccountReviewsList
from queries.reviews import ReviewQueries
from fastapi import (
    Depends,
    APIRouter,
)
from authenticator import authenticator

router = APIRouter()


@router.get("/api/reviews/{account_id}", response_model=AccountReviewsList)
def reviews_for_current_user(
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: ReviewQueries = Depends(),
):
    return {"reviews": queries.reviews_for_account(account_id=account_data["id"])}


@router.get("/api/reviews/park/{parkCode}", response_model=ParkReviewsList)
def reviews_for_park(
    parkCode: str,
    queries: ReviewQueries = Depends(),
):
    return {"reviews": queries.reviews_for_park(parkCode=parkCode)}


@router.post("/api/reviews", response_model=ReviewOut)
def create_review(
    review_in: ReviewIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: ReviewQueries = Depends(),
):
    return queries.create(
        review_in=review_in, account_id=account_data["id"]
    )


@router.delete("/api/reviews/{review_id}")
def delete_review(
    review_id: str,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: ReviewQueries = Depends(),
):
    return queries.delete(
        review_id=review_id, account_id=account_data["id"]
    )


@router.put("/api/reviews/{review_id}")
def update_review(
    review_id: str,
    review_in: ReviewIn,
    account_data: dict = Depends(authenticator.get_current_account_data),
    queries: ReviewQueries = Depends(),
):
    return queries.edit_review(
        review_id=review_id, review_in=review_in, account_id=account_data["id"]
    )
