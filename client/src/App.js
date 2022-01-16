import { useEffect, useRef, useState } from "react";
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
import { newMessage, setChats } from "./reducers/chatSlice";
import useSound from "use-sound";
import newMsgSound from "./assets/new-message.mp3";
import APIService from "./services/APIService";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const pusher = new Pusher("92f428a20d5de670ac76", { cluster: "eu" });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", async (newMsg) => {
      dispatch(newMessage(newMsg));
      const chats = await APIService.getFromRoute("/api/chats/");
      if (chats) {
        dispatch(setChats(chats));
      }
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.unsubscribe("messages");
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<AppBody />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
