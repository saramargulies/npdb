import { useState, useEffect } from "react";
import { useGetAccountQuery } from "./app/apiSlice";
import './chat.css'

const App = () => {
  const [text, setText] = useState();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();

  const account = useGetAccountQuery();
  // console.log({ outer_account: account });

  useEffect(() => {
    const account_id = account?.data?.id;

    if (account_id) {
      const ws = new WebSocket(`ws://localhost:8000/ws/${account_id}`);

      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        setMessages((prev) => [...prev, newMessage]);
      };

      ws.onclose = () => {
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
    <div className="page-container">
    <div className="spacer"></div>
    <section>
      <div className="container container-fluid">

        <div className="row container-fluid d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">

            <div className="card " id="chat1" >
              <div
                className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0">
                <i className="fas fa-angle-left"></i>
                <p className="mb-0 fw-bold">Live chat</p>
                <i className="fas fa-times"></i>
              </div>
              <div className="card-body chat-body">
                <div>
                      <input type="text" onChange={(e) => setText(e.target.value)}></input>
                      <button
                        onClick={() =>
                          socket.send(
                            JSON.stringify({
                              account_id: account.data.id,
                              full_name: account.data.full_name,
                              message: text,
                            })
                          )
                        }
                      >
                        Send
                      </button>
                      <div>
                        {messages.map((message) => {
                          const displayed_name =
                            message.full_name === account.data.full_name
                              ? "You"
                              : message.full_name;

                          return (
                                  <div className="d-flex flex-row justify-content-start mb-4">
                                    <div className="ms-3">
                                        <div className="mask">                            <p key={message.message}>
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
    <div className="spacer"></div>
    <div className="spacer"></div>
    </div>
    </>
  );
};

export default App;
