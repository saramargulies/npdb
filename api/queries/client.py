from pymongo import MongoClient
import os

DATABASE_URL = os.environ.get("DATABASE_URL")
client = MongoClient(DATABASE_URL)
db = client["park-project-data"]


class MongoQueries:
    @property
    def collection(self):
        return db[self.collection_name]
