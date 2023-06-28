from pydantic import BaseModel
from typing import List


class ParkOut(BaseModel):
    id: 


class ListParksOut(BaseModel):
    park: list[ParkOut]