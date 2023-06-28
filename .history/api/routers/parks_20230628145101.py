from fastapi import APIRouter, Depends
from models import ListParksOut
from queries.parks import ParkQueries


router = APIRouter()


@router.get("/api/parks/{state}", response_model=ListParksOut)
def get_parks_by_state(state: str, queries: ParkQueries = Depends()):
    return queries.get_by_state(state)
