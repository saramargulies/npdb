from pydantic import BaseModel
from pymongo import MongoClient

DATABASE_URL = os.environ.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client

class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    username: str
    email: str
    full_name: str


class AccountRepo(BaseModel):
    def get(self, email: str) -> AccountOut:
        return {
            "email": email
        }

    def create(self, info: AccountIn, hashed_password: str) -> AccountOut:
        info = info.dict()
        collection = 
