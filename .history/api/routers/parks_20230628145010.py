from fastapi import APIRouter, Depends
from models import ListParksOut
from qu


router = APIRouter()

@router.get('/api/parks/{state}', response_model=ListParksOut)
def get_parks_by_state(state: str, queries: ParkQueries)