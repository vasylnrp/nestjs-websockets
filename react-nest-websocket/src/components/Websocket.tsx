import { useContext, useEffect, useState } from "react"
import { WebsocketContext } from "../WebsocketContext"

type MessagePayload = {
  content: string;
  msg: string;
}

export const Websocket = () => {

  const [value, setValue] = useState('');
  const [messages, setMessages] = useState<MessagePayload[]>([]);
  const socket = useContext(WebsocketContext);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected!');
    })
    socket.on('onMessage', (newMessage: MessagePayload) => {
      console.log('onMessage event received!');
      console.log({ newMessage });
      setMessages((prev) => [...prev, newMessage]);
    });
    return () => {
      console.log('Unregistering Events...');
      socket.off('connect');
      socket.off('onMessage');
    };
  }, []);

  const hashCode = (s:string): number => {
    var h = 0, l = s.length, i = 0;
    if ( l > 0 )
      while (i < l)
        h = (h << 5) - h + s.charCodeAt(i++) | 0;
    return h;
  };

  const onSubmit = () => {
    socket.emit("newMessage", value);
    setValue("");
  }

  return (
    <div
      style={{marginLeft: '10px',}}
    >
      <h1>
        Websocket Component
      </h1>
      <>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={onSubmit}>Submit</button>
      </>
      <div>
        {messages.length === 0
          ? (<>
            No Messages
          </>)
          : (
            <>
              {messages.map((msg) => (
                <p key={hashCode(msg.content)}>{msg.content}</p>
              ))}
            </>
          )
        }
      </div>
    </div>
  )
}
