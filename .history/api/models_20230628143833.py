from pydantic import BaseModel
from typing import List


class ParkOut(BaseModel)


class ParksOut(BaseModel):
    park: list[ParkOut]