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
    
  );
};

export default App;
