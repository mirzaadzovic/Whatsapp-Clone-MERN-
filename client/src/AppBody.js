import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { logIn, selectLoggedInUser } from "./reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "./axios";
import { setChats, setMessages, setOpenedChat } from "./reducers/chatSlice";
import APIService from "./services/APIService";
import AuthService from "./services/AuthService";

const AppBody = ({ messages }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const user = await AuthService.getUser();

    if (user) {
      dispatch(logIn(user));

      const chats = await APIService.getFromRoute("/api/chats");
      const messages = await APIService.getMessages(chats[0]);
      console.log(chats[0]);

      dispatch(setChats(chats));
      dispatch(setOpenedChat(chats[0]));
      dispatch(setMessages(messages));
      setLoading(false);
    } else {
      navigate("/login");
      setLoading(false);
    }
  }, []);

  if (loading) return <h2>Loading...</h2>;

  return (
    <div className="app__body">
      <Sidebar />
      <Chat messages={messages} />
    </div>
  );
};

export default AppBody;
