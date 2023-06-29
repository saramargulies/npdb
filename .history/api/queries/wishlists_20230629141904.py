from models import WishlistItemIn
from bson.objectid import ObjectId
from queries.client import MongoQueries


class WishlistQueries(MongoQueries):
    collection_name = "wishlist"

    def create(self, wishlist_item_in: WishlistItemIn, account_id: str):
        item = wishlist_item_in.dict()
        item["account_id"] = account_id
        self.collection.insert_one(item)
        item["id"] = str(item["_id"])
        item["visited"] = False
        return item

    def wishlist_for_account(self, account_id: str):
        results = []
        for item in self.collection.find({'account_id': account_id}):
            print(item)
            item['id'] = str(item['_id'])
            print(item['visited'])
            results.append(item)
        return results

    def delete(self, item_id: str, account_id: str):
        result = self.collection.delete_one(
            {'_id': ObjectId(item_id), 'account_id': account_id}
            )
        return result.deleted_count > 0
