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
      console.log(socket);

      console.log('Connected!');
    })
    socket.on('onMessage', (newMessage: MessagePayload) => {
      console.log('onMessage event received!');
      console.log({ newMessage });
      setMessages((prev) => [newMessage, ...prev]);
    });
    return () => {
      console.log('Unregistering Events...');
      socket.off('connect');
      socket.off('onMessage');
    };
  }, []);

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
        {/* <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        /> */}
        <button onClick={onSubmit}>Submit</button>
      </>
      <div>
        {messages.length === 0
          ? (<>
            No events
          </>)
          : (
            <>
              {messages.map((msg, index) => (
                <p key={index}>{msg.content}</p>
              ))}
            </>
          )
        }
      </div>
    </div>
  )
}
