from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import os
import json
from authenticator import authenticator
from routers import signup, parks, wishlists, reviews
import uuid


app = FastAPI()
app.include_router(authenticator.router, tags=["Accounts"])
app.include_router(signup.signup, tags=["Accounts"])
app.include_router(parks.router, tags=["Park Data"])
app.include_router(wishlists.router, tags=["Wishlists"])
app.include_router(reviews.router, tags=["Reviews"])

# origins = [
#     "http://localhost:3000",
#     os.environ.get("CORS_HOST", None),
# ]

app.add_middleware(
    CORSMiddleware,
    # allow_origins=origins,
    # [os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return True


class ConnectionManager:
    def __init__(self):
        self.active_connections: list[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            await connection.send_text(message)


manager = ConnectionManager()


@app.websocket("/ws/{account_id}")
async def websocket_endpoint(websocket: WebSocket, account_id: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            parsed_data = json.loads(data)
            print("DATA DATA DATA" + str(parsed_data))
            await manager.broadcast(
                json.dumps(
                    {
                        "id": str(uuid.uuid4()),
                        "account_id": account_id,
                        "message": parsed_data["message"],
                        "full_name": parsed_data["full_name"],
                    }
                )
            )
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f"Client #{account_id} left the chat")
