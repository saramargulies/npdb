from models import ReviewIn
from bson.objectid import ObjectId
from queries.client import MongoQueries


class ReviewQueries(MongoQueries):
    collection_name = "reviews"

    def reviews_for_park(self, parkCode: str):
        results = []
        for review in self.collection.find({"parkCode": parkCode}):
            review["id"] = str(review["_id"])
            results.append(review)
        return results

    def reviews_for_account(self, account_id: str):
        results = []
        for review in self.collection.find({"account_id": account_id}):
            review["id"] = str(review["_id"])
            results.append(review)
        return results

    def create(self, review_in: ReviewIn, account_id: str):
        review = review_in.dict()
        review["account_id"] = account_id
        self.collection.insert_one(review)
        review["id"] = str(review["_id"])
        return review

    def delete(self, review_id: str, account_id: str):
        result = self.collection.delete_one(
            {"_id": ObjectId(review_id), "account_id": account_id}
        )
        return result.deleted_count > 0

    def get_review_by_id(self, review_id: str):
        result = self.collection.find({"review_id": review_id})
        return result

    def edit_review(
        self, review_id: str, account_id: str, review_in: ReviewIn
    ):
        result = self.collection.update_one(
            {"_id": ObjectId(review_id)}, {"$set": review_in.dict()}
        )
        return result
