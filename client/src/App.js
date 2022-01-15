import { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import Pusher from "pusher-js";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Login from "./components/login/Login";
import AppBody from "./AppBody";
import Register from "./components/register/Register";
import { logIn, selectLoggedInUser } from "./reducers/userSlice";
import axios from "./axios";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();

  useEffect(async () => {
    axios
      .get("/auth/user", { withCredentials: true })
      .then((res) => {
        dispatch(logIn(res.data));
      })
      .catch((err) => err);
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
