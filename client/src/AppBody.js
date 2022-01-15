import React, { useEffect } from "react";
import "./App.css";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "./reducers/userSlice";
import { useNavigate } from "react-router-dom";

const AppBody = ({ messages }) => {
  const user = useSelector(selectLoggedInUser);
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(user).length === 0) navigate("/login");
    console.log(user);
  }, []);

  return (
    <div className="app__body">
      <Sidebar />
      <Chat messages={messages} />
    </div>
  );
};

export default AppBody;
