from pydantic import BaseModel, Queries


class DuplicateAccountError(ValueError):
    pass


class AccountIn(BaseModel):
    username: str
    email: str
    password: str
    full_name: str


class AccountOut(BaseModel):
    id: str
    email: str
    full_name: str


class AccountRepo(BaseModel):
    def get(self, email: str) -> AccountOut:
        pass

    def create(self, info: AccountIn, hashed_password: str) -> AccountOut:
        pass
