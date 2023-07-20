import { useState, useEffect } from "react";
import { useGetAccountQuery } from "./app/apiSlice";

const App = () => {
  const [text, setText] = useState();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();

  const account = useGetAccountQuery();
  console.log({ outer_account: account });

  useEffect(() => {
    const account_id = account?.data?.id;
    console.log({ account_id });
    console.log({ account });

    if (account_id) {
      const ws = new WebSocket(`ws://localhost:8000/ws/${account_id}`);

      //Even Listener
      ws.onmessage = (event) => {
        const newMessage = JSON.parse(event.data);
        console.log(newMessage);
        setMessages((prev) => [...prev, newMessage]);
      };

      ws.onclose = () => {
        console.log("disconnected");
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
      <div className="container py-5">

        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">

            <div className="card " id="chat1" >
              <div
                className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0">
                <i className="fas fa-angle-left"></i>
                <p className="mb-0 fw-bold">Live chat</p>
                <i className="fas fa-times"></i>
              </div>
              <div className="card-body">
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
                <div className="bg-image">
                    <div className="mask"></div>
                  </a>
                </div>
              </div>
                            <p key={message.message}>
                              {displayed_name} wrote: {message.message}
                            </p>
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
