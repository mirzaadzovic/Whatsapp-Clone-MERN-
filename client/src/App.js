import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import Pusher from "pusher-js";
import axios from "./axios";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./components/login/Login";
import AppBody from "./AppBody";
import Register from "./components/register/Register";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get("/api/messages/").then((response) => setMessages(response.data));
  }, []);

  useEffect(() => {
    const pusher = new Pusher("92f428a20d5de670ac76", { cluster: "eu" });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      console.log(newMessage);
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.unsubscribe("messages");
    };
  }, [messages]);
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<AppBody messages={messages} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
