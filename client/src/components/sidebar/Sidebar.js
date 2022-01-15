import React from "react";
import "./Sidebar.css";
import { IconButton, Avatar } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "../sidebarChat/SidebarChat";
import { useSelector } from "react-redux";
import { selectLoggedInUser } from "../../reducers/userSlice";
import { selectChats } from "../../reducers/chatSlice";

const Sidebar = () => {
  const user = useSelector(selectLoggedInUser);
  const chats = useSelector(selectChats);
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerLeft">
          <Avatar src={user?.avatarUrl} />
        </div>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon className="sidebar__headerIcon" />
          </IconButton>
          <IconButton>
            <ChatIcon className="sidebar__headerIcon" />
          </IconButton>
          <IconButton>
            <MoreVertIcon className="sidebar__headerIcon" />
          </IconButton>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon className="sidebar__headerIcon" />
          <input type="text" placeholder="Search or start new chat" />
        </div>
      </div>

      <div className="sidebar__chats">
        {chats.map((chat) => (
          <SidebarChat user={chat.withUser} lastMessage="Kakav si brate" />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
