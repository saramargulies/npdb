from pydantic import BaseModel
from typing import List


class ParksOut(BaseModel):
    park: list[ParksOut]