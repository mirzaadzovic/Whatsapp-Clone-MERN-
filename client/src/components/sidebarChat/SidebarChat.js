import { Avatar } from "@mui/material";
import React from "react";
import "./SidebarChat.css";
import axios from "../../axios";
import { useDispatch } from "react-redux";
import { setMessages, setOpenedChat } from "../../reducers/chatSlice";

const SidebarChat = ({ user, lastMessage, chat }) => {
  const dispatch = useDispatch();
  const fetchMessages = async () => {
    const response = await axios
      .get(`/api/messages/${chat.id}`, {
        withCredentials: true,
      })
      .catch((err) => console.error(err));

    if (response.status === 200) {
      const messages = response.data;
      console.log(messages);
      dispatch(setMessages(messages));
      dispatch(setOpenedChat(chat));
    }
  };

  return (
    <div className="sidebarChat" onClick={() => fetchMessages()}>
      <Avatar src={user?.avatarUrl} />
      <div className="sidebarChat__info">
        <h3>{user?.username}</h3>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default SidebarChat;
