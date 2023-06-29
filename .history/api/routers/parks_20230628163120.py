from fastapi import APIRouter, Depends
from models import ListParksOut, ParkOut
from queries.parks import ParkQueries


router = APIRouter()


@router.get("/api/parks/{state}", response_model=ListParksOut)
def get_parks_by_state(state: str, queries: ParkQueries = Depends()):
    return queries.get_by_state(state)


@router.get("/api/parks/", response_model=ListParksOut)
def get_park_by_code(queries: ParkQueries = Depends()):
    return queries.get_one_by_code(code)
