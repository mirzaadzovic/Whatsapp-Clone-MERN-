import React, { useEffect } from "react";
import "./App.css";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { logIn, selectLoggedInUser } from "./reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "./axios";
import { setChats } from "./reducers/chatSlice";

const AppBody = ({ messages }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(async () => {
    let response = await axios
      .get("/auth/user", { withCredentials: true })
      .catch((err) => {
        console.error(err);
        navigate("/login");
      });

    const user = response.data;
    console.log(user);

    dispatch(logIn(user));

    if (response.status === 200) {
      response = await axios.get("/api/chats", { withCredentials: true });
      const chats = response.data;
      console.log(chats);
      dispatch(setChats(chats));
    }
  }, []);

  return (
    <div className="app__body">
      <Sidebar />
      <Chat messages={messages} />
    </div>
  );
};

export default AppBody;
