import { useState, useEffect } from "react";

const App = () => {
  const [text, setText] = useState();
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState();

  useEffect(() => {
    const client_id = Date.now();

    const ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`);

    //Even Listener
    ws.onmessage = (event) => {
      console.log(event.data);
      setMessages((prev) => [...prev, event.data]);
    };

    ws.onclose = () => {
      console.log("disconnected");
      const ws = new WebSocket(`ws://localhost:8000/ws/${client_id}`);
      setSocket(ws);
    };

    setSocket(ws);
    return () => {
      ws.close();
    };
  }, []);

  return (
    <>
      <input type="text" onChange={(e) => setText(e.target.value)}></input>
      <button onClick={() => socket.send(JSON.stringify(text))}>Send</button>
      {messages.map((message) => {
        return <p key={message}>{message}</p>;
      })}
    </>
  );
};

export default App;
