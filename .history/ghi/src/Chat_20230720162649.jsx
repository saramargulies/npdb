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
    <section style="background-color: #eee;">
      <div className="container py-5">

        <div className="row d-flex justify-content-center">
          <div className="col-md-8 col-lg-6 col-xl-4">

            <div className="card" id="chat1" style="border-radius: 15px;">
              <div
                className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0"
                style="border-top-left-radius: 15px; border-top-right-radius: 15px;">
                <i className="fas fa-angle-left"></i>
                <p className="mb-0 fw-bold">Live chat</p>
                <i className="fas fa-times"></i>
              </div>
              <div className="card-body">

                <div className="d-flex flex-row justify-content-start mb-4">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1" style="width: 45px; height: 100%;"/>
                  <div className="p-3 ms-3" style="border-radius: 15px; background-color: rgba(57, 192, 237,.2);">
                    <p className="small mb-0">Hello and thank you for visiting MDBootstrap. Please click the video
                      below.</p>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-end mb-4">
                  <div className="p-3 me-3 border" style="border-radius: 15px; background-color: #fbfbfb;">
                    <p className="small mb-0">Thank you, I really like your product.</p>
                  </div>
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    alt="avatar 1" style="width: 45px; height: 100%;" />
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1" style="width: 45px; height: 100%;" />
                  <div className="ms-3" style="border-radius: 15px;">
                    <div className="bg-image">
                      <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/screenshot1.webp"
 />
                      <a href="#!">
                        <div className="mask"></div>
                      </a>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-row justify-content-start mb-4">
                  <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="avatar 1"/>
                  <div className="p-3 ms-3" >
                    <p className="small mb-0">...</p>
                  </div>
                </div>

                <div className="form-outline">
                  <textarea className="form-control" id="textAreaExample" rows="4"></textarea>
                  <label className="form-label" htmlFor="textAreaExample">Type your message</label>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
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
            <p key={message.message}>
              {displayed_name} wrote: {message.message}
            </p>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default App;
