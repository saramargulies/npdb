from pydantic import BaseModel
from pymongo import MongoClient
import os

DATABASE_URL = os.environ.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["park-project-data"]
collection = db["accounts"]


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
    password: str


class AccountRepo(BaseModel):
    def get(self, email: str) -> AccountOut:
        acc = collection.find_one({"email": email})
        if not acc:
            return None
        acc["id"] = str(acc[""])

    def create(self, info: AccountIn, hashed_password: str) -> AccountOut:
        info.password = hashed_password
        info = info.dict()

        collection.insert_one(info)
        info["id"] = str(info["_id"])
        return AccountOut(**info)
