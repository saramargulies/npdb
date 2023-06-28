from pydantic import BaseModel
from typing import List


class ParkOut(BaseModel):
    id: str
    url: str


class ListParksOut(BaseModel):
    park: list[ParkOut]