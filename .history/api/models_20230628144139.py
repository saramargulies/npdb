from pydantic import BaseModel
from typing import List


class ParkOut(BaseModel):
    id: str
    url: str
    full


class ListParksOut(BaseModel):
    park: list[ParkOut]