import { Avatar } from "@mui/material";
import React from "react";
import "./SidebarChat.css";
import { useDispatch } from "react-redux";
import APIService from "../../services/APIService";
import { setMessages, setOpenedChat } from "../../reducers/chatSlice";

const SidebarChat = ({ user, lastMessage, chat }) => {
  const dispatch = useDispatch();

  const selectChat = async () => {
    const messages = await APIService.getMessages(chat);
    if (messages) {
      dispatch(setOpenedChat(chat));
      dispatch(setMessages(messages));
    }
  };

  return (
    <div className="sidebarChat" onClick={selectChat}>
      <Avatar src={user?.avatarUrl} />
      <div className="sidebarChat__info">
        <h3>{user?.username}</h3>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default SidebarChat;
