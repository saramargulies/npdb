
----------------------------------------------------
* "National Park Database" Project Endpoints
----------------------------------------------------

* Create User Account

* Endpoint path: api/accounts
* Endpoint method: POST
* Headers:
  * None
* Request shape (JSON):
    ```json
    {
        "username": str,
        "password": str,
        "full_name": str
    }
    ```json
* Response: creates account information with access token
* Response shape (JSON):
    ```json
    {
        "access_token": str,
        "token_type": str,
        "account": {
            "id": str,
            "username": str,
            "full_name": str
        }
    }
    ```json

----------------------------------------------------

* User Login

* Endpoint path: /token
* Endpoint method: POST
* Headers:
  * None
* Request shape (JSON):
    ```json
    {
        "username": str,
        "password": str,
    }
    ```json
* Response: Logs in and authenticates the user credentials for an account
* Response shape (JSON):
    ```json
    {
        "access_token": str,
        "token_type": str,
    }
    ```json

----------------------------------------------------

* User Logout

* Endpoint path: /token
* Endpoint method: DELETE
* Headers:
  * Authorization: Bearer token
* Response: Logs current user out of their account
* Response shape (JSON):
    ```json
    {
        "true"
    }
    ```json
* Note: Always returns "true"

----------------------------------------------------

* Get Parks By State

* Endpoint path: https://developer.nps.gov/api/v1/parks
* Endpoint method: GET
* Query parameters:
  * state: filter by state /${ }
* Headers:
  * Authorization: API key
* Response: National parks filtered by state
* Response shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```
----------------------------------------------------

* Get Park Details

* Endpoint path: https://developer.nps.gov/api/v1/parks/${park_id}
* Endpoint method: GET
* Headers:
  * Authorization: API key
* Request shape (JSON):
    ```json
    {
        ""
    }
    ```
* Response: «Human-readable description
            of response»
* Response shape (JSON):
    ```json
    «JSON-looking thing that has the
    keys and types in it»
    ```
----------------------------------------------------

* Get User Wishlist

* Endpoint path: api/wishlists/{user_id}/
* Endpoint method: GET
* Query parameters:
  * user: get by Bearer token
* Headers:
  * Authorization: Bearer token
* Response: a list of all the parks in a user's wishlist
* Response shape (JSON):
    ```json
    {
        "wishlist": [
            {
                "name": str,
                "location": str,
                "park_id": str,
                "notes": str,
            }
        ]
    }
    ```
----------------------------------------------------

* Delete Park From Wishlist

* Endpoint path: api/wishlists/{user_id}/
* Endpoint method: DELETE
* Query parameters:
  * user: get by Bearer token
* Headers:
  * Authorization: Bearer token
* Request shape (JSON):
    ```json
    {
        "park":
            {
                "park_id": str,
                "wishlist_id": str
            }
    }
    ```
* Response: tells whether or not the object was deleted
* Response shape (JSON):
    ```json
    {
        "deleted": bool
    }
    ```
----------------------------------------------------

* Add Park To Wishlist

* Endpoint path: api/wishlists/{user_id}/
* Endpoint method: POST
* Query parameters:
  * user: get by Bearer token
* Headers:
  * Authorization: Bearer token
* Request shape (JSON):
    ```json
    {
        "park":
            {
                "name": str,
                "location": str,
                "park_id": str,
                "user_id": str,
                "notes": str
            }
    }
    ```
* Response: the wishlist with the new item in it
* Response shape (JSON):
    ```json
    {
        "wishlist": [
            {
                "name": str,
                "location": str,
                "park_id": str,
                "notes": str
            }
        ]
    }
    ```
----------------------------------------------------

* Get User Visited List

* Endpoint path: api/visits/{user_id}/
* Endpoint method: GET
* Query parameters:
  * user: get by Bearer token
* Headers:
  * Authorization: Bearer token
* Response: visited list of a specific user
* Response shape (JSON):
    ```json
    {
        "visited": [
            {
                "name": str,
                "location": str,
                "park_id": str,
                "reviewed": bool,
                "review": review_id or null
            }
        ]
    }
    ```
----------------------------------------------------

* Delete Park From Visited

* Endpoint path: api/visits/{user_id}/
* Endpoint method: DELETE
* Query parameters:
  * user: get by Bearer token
* Headers:
  * Authorization: Bearer token
* Request shape (JSON):
    ```json
    {
        "park":
            {
                "park_id": str,
                "visited_id": str
            }
    }
    ```
* Response: true if item was deleted
* Response shape (JSON):
    ```json
    {
        "deleted": bool
    }
    ```
----------------------------------------------------

* Get Park Reviews List

* Endpoint path: api/reviews/
* Endpoint method: GET
* Query parameters:
  * park: get by {park_id}
* Headers:
  * Authorization: Bearer token
* Response: the reviews for a specific park
* Response shape (JSON):
    ```json
    {
        "reviews":[
            {
        "park_id": str,
        "review": str,
        "rating": int,
        "user": {
            "user_id": str,
            "username": username
        }
        },
        ]
    }
    ```
----------------------------------------------------

Create Review

* Endpoint path: api/reviews/
* Endpoint method: POST
* Query parameters:
  * park: get by {park_id}
* Headers:
  * Authorization: Bearer token
* Request shape (JSON):
    ```json
    {
        "park_id": str,
        "review": str,
        "rating": int,
        "user_id": str
    }
    ```
* Response: the review that was just created
* Response shape (JSON):
    ```json
    {
        "park_id": str,
        "review": str,
        "rating": int,
        "user_id": str,
        "review_id": str
    }
    ```
----------------------------------------------------

* Update Review

* Endpoint path: api/reviews/{review_id}
* Endpoint method: PUT
* Headers:
  * Authorization: Bearer token
* Request shape (JSON):
    ```json
    {
        "review": str,
        "rating": int,
    }
    ```
* Response: the review that was just created
* Response shape (JSON):
    ```json
    {
        "park_id": str,
        "review": str,
        "rating": int,
        "user_id": str,
        "review_id": str
    }
    ```
----------------------------------------------------

* Show All User Reviews

* Endpoint path: api/reviews/{user_id}
* Endpoint method: GET
* Headers:
  * Authorization: Bearer token
    ```

* Response shape (JSON):
    ```json
    {
        "reviews":[
            {
        "park_id": str,
        "review": str,
        "rating": int,
        "user": {
            "user_id": str,
            "username": username
        }
        },
        ]
    }
    ```
* Response: List of all the reviews for one user
