from fastapi import APIRouter, Depends
from models import ListParkOut


router = APIRouter()

@router.get('/api/parks/{state}', response_model=Park)
