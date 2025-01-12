import { useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [messages, setMessage] = useState([
    "hi there",
    "wassup jaan",
    "tu mor doukey?",
  ]);

  const wsRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");

    ws.onmessage = (event) => {
      setMessage((m) => [...m, event.data]);
    };

    wsRef.current = ws;



    ws.onopen = () => {
      ws.send(JSON.stringify({
        type: "join",
        payload: {
          roomId: "red"
        }
      }))
    }

    return () => {
      ws.close()
    }

  }, []);

  return (
    <>
      <div className="h-screen bg-black">
        <div className="h-[90vh] pt-8 pl-4">
          {messages.map((messages) => (
            <div className="mt-10">
              <span className="bg-white text-black rounded p-4">
                {" "}
                {messages}{" "}
              </span>
            </div>
          ))}
        </div>
        <div className="w-full flex gap-1">
          <input id="message" type="text" className="flex-1 p-3" />
          <button
            onClick={() => {
              const message = document.getElementById("message")?.value;

              wsRef.current.send(
                JSON.stringify({
                  type: "chat",
                  payload: {
                    message: message,
                  },
                })
              );
            }}
            className="bg-purple-600 text-white rounded-xl p-2"
          >
            Send Message
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
