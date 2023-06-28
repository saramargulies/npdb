from fastapi import APIRouter, Depends
from models import ParkOut


router = APIRouter()

@router.get('/api/parks/{state}', response)
