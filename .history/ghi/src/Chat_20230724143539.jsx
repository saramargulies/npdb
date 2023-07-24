import { useState, useEffect, useRef } from "react";
import { useGetAccountQuery } from "./app/apiSlice";
import "./chat.css";

const App = () => {
  const [text, setText] = useState();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();
  const inputRef = useRef(null);

  const account = useGetAccountQuery();

  const handleSend = () => {
    socket.send(
      JSON.stringify({
        account_id: account.data.id,
        full_name: account.data.full_name,
        message: text,
      })
    );
    inputRef.current.value = "";
  };

  const inputListener = (event) => {
    if (event.code === "Enter" || event.code === "NumpadEnter") {
      console.log("Enter key was pressed. Run your function.");
      event.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const account_id = account?.data?.id;

    if (account_id) {
      const ws = new WebSocket(`ws://localhost:8000/ws/${account_id}`);

      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        console.log(newMessage);
        setMessages((prev) => [...prev, newMessage]);
      };

      ws.onclose = () => {s
        const ws = new WebSocket(`ws://localhost:8000/ws/${account_id}`);
        setSocket(ws);
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [account]);

  return (
    <>
      <section>
        <div className="container container-fluid">
          <div className="row container-fluid d-flex justify-content-center">
            <div className="col-md-8 col-lg-6 col-xl-4">
              <div
                className="card"
                id="chat1"
                style={{ height: "calc(100vh - 126px - 314px)" }}
              >
                <div className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0">
                  <i className="fas fa-angle-left"></i>
                  <p className="mb-0 fw-bold">Live chat</p>
                  <i className="fas fa-times"></i>
                </div>
                <div
                  className="card-body chat-body"
                  style={{ overflowY: "auto" }}
                >
                  <div>
                    <div className="d-flex">
                      <input
                        onKeyUp={inputListener}
                        ref={inputRef}
                        type="text"
                        className="form-control"
                        onChange={(e) => setText(e.target.value)}
                      ></input>
                      <button
                        className="btn btn-primary display-7 ms-2"
                        onClick={handleSend}
                      >
                        Send
                      </button>
                    </div>
                    <div>
                      {messages.map((message) => {
                        const displayed_name =
                          message.full_name === account.data.full_name
                            ? "You"
                            : message.full_name;

                        return (
                          <div
                            key={message.id}
                            className="d-flex flex-row justify-content-start mb-.25"
                          >
                            <div className="ms-1">
                              <div className="mask">
                                <p className="m-0">
                                  {displayed_name} wrote: {message.message}
                                </p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default App;
