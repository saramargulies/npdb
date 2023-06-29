from models import WishlistItemIn
from bson.objectid import ObjectId
from queries.client import MongoQueries
from models import VisitedListItemIn


class VisitedListQueries(MongoQueries):
    collection_name = "visited_list"


    def visited_list_for_account(self, account_id: str):
        results = []
        for item in self.collection.find({"account_id": account_id}):
            item["id"] = str(item["_id"])
            results.append(item)
        return results


    def create(self, visited_list_item_in: VisitedListItemIn, account_id: str):
        item = visited_list_item_in.dict()
        item["account_id"] = account_id
        self.collection.insert_one(item)
        item["id"] = str(item["_id"])
        return item


    def delete(self, visited_list_item_id: str, account_id: str):
        result = self.collection.delete_one(
            {"_id": ObjectId(visited_list_item_id), "account_id": account_id}
        )
        return result.deleted_count > 0
