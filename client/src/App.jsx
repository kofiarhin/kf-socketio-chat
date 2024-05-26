import "./app.scss";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("https://kf-socketio-chat.onrender.com/");
const App = () => {
  const [inputMessage, setInputMessage] = useState("");
  const [message, setMessage] = useState("");
  useEffect(() => {
    socket.on("new_message", (data) => {
      setMessage(data.message);
    });
  }, [socket]);

  const handleChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputMessage) {
      return;
    }

    socket.emit("send_message", { message: inputMessage });
    setInputMessage("");
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="inputMessage"
          value={inputMessage}
          onChange={handleChange}
          placeholder="Enter message..."
        />

        <button>Send Message</button>
      </form>

      {message && <h2 className="message"> {message} </h2>}
    </div>
  );
};
export default App;
