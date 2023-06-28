from pydantic import BaseModel
from typing import List


class ParkOut(BaseModel)


class ListParksOut(BaseModel):
    park: list[ParkOut]