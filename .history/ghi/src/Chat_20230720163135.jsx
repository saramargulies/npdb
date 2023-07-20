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

            <div className="card" id="chat1" >
              <div
                className="card-header d-flex justify-content-between align-items-center p-3 bg-info text-white border-bottom-0">
                <i className="fas fa-angle-left"></i>
                <p className="mb-0 fw-bold">Live chat</p>
                <i className="fas fa-times"></i>
              </div>
              <div className="card-body">


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

    </>
  );
};

export default App;
