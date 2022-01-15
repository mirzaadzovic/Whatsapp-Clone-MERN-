import { Avatar } from "@mui/material";
import React from "react";
import "./SidebarChat.css";

const SidebarChat = ({ user, lastMessage }) => {
  return (
    <div className="sidebarChat">
      <Avatar src={user?.avatarUrl} />
      <div className="sidebarChat__info">
        <h3>{user?.username}</h3>
        <p>{lastMessage}</p>
      </div>
    </div>
  );
};

export default SidebarChat;
