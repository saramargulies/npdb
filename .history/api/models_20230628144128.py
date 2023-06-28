from pydantic import BaseModel
from typing import List


class ParkOut(BaseModel):
    id: str


class ListParksOut(BaseModel):
    park: list[ParkOut]