from pydantic import BaseModel
from typing import List


class ActivityOut(BaseModel):
    id: str
    name: str


class ImageOut(BaseModel):
    title: str
    altText: str
    url: str


class ParkOut(BaseModel):
    id: str
    url: str
    fullName: str
    parkCode: str
    description: str
    activities: list[ActivityOut]
    states: str
    images: list[ImageOut]


class ListParksOut(BaseModel):
    data: List[ParkOut]


class WishlistItemIn(BaseModel):
    fullName: str
    states: str
    visited: bool = False


class WishlistItemOut(BaseModel):
    id: str
    fullName: str
    states: str
    account_id: str
    visited: bool = False


class Wishlist(BaseModel):
    wishlist_items: List[WishlistItemOut]


class VisitedListItemIn(BaseModel):
    fullName: str
    states: str
    reviewed: bool = False


class VisitedListItemOut(BaseModel):
    id: str
    fullName: str
    states: str
    account_id: str
    reviewed: bool = False


class VisitedList(BaseModel):
    visited_list_items: List[VisitedListItemOut]


class ReviewIn(BaseModel):
    parkCode: str
    review: str
    rating: int


class ReviewOut(BaseModel):
    id: str
    parkCode: str
    review: str
    rating: int
    account_id: str


class ParkReviewsList(BaseModel):
    reviews: List[ReviewOut]
    # parkCode: str


class AccountReviewsList(BaseModel):
    reviews: List[ReviewOut]
    # account_id: str
