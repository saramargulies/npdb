from fastapi import APIRouter, Depends
from models import ListParksOut


router = APIRouter()

@router.get('/api/parks/{state}', response_model=Park)
