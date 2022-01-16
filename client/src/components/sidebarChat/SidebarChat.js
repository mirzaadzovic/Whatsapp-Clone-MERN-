import { Avatar } from "@mui/material";
import React from "react";
import "./SidebarChat.css";
import { useDispatch } from "react-redux";
import APIService from "../../services/APIService";
import { setMessages, setOpenedChat } from "../../reducers/chatSlice";
import { useNavigate } from "react-router-dom";

const SidebarChat = ({ user, lastMessage, chat, you }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectChat = async () => {
    const messages = await APIService.getById("/api/messages", chat.id);
    if (messages) {
      dispatch(setOpenedChat(chat));
      dispatch(setMessages(messages));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="sidebarChat" onClick={selectChat}>
      <Avatar src={user?.avatarUrl} />
      <div className="sidebarChat__info">
        <h3>{user?.username}</h3>
        <p>{`${you ? "You: " : ""}${lastMessage}`}</p>
      </div>
    </div>
  );
};

export default SidebarChat;
