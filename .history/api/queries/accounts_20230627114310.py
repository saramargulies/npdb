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
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    username: str
    full_name: str


class AccountOutWithPassword(AccountOut):
    hashed_password: str


class AccountRepo(BaseModel):
    def get(self, username: str) -> AccountOutWithPassword:
        acc = collection.find_one({"username": username})
        if not acc:
            return None
        acc["id"] = str(acc["_id"])
        return AccountOutWithPassword

    def create(
        self, info: AccountIn, hashed_password: str
    ) -> AccountOutWithPassword:
        info = info.dict()
        print(info)
        collection.insert_one(info)
        id = str(info["_id"])
        acc = AccountOutWithPassword(
            **info, hashed_password=hashed_password, id=id
        )
        return acc
