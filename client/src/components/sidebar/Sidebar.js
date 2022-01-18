import React, { useState } from "react";
import "./Sidebar.css";
import { IconButton, Avatar } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./sidebarChat/SidebarChat";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "../../reducers/userSlice";
import { selectChats } from "../../reducers/chatSlice";
import SearchDialog from "./searchDialog/SearchDialog";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip/Tooltip";
import {
  selectSearchInput,
  setSearchInput,
  setSearchUsers,
} from "../../reducers/searchSlice";
import APIService from "../../services/APIService";
import AuthService from "../../services/AuthService";
import { Navigate, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const chats = useSelector(selectChats);
  const searchInput = useSelector(selectSearchInput);

  const filterSearch = (users) => {
    return (users = users.filter(
      (u) => u.id !== user.id && !chats.some((c) => c.withUser.id === u.id)
    ));
  };
  const search = async (value) => {
    dispatch(setSearchInput(value));
    let users = await APIService.getFromRoute(`/api/users/${value}`);

    users = filterSearch(users);
    dispatch(setSearchUsers(users));
  };
  const logout = async () => {
    await AuthService.logout();
    navigate("/login");
  };

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
          <Tooltip title="Logout" arrow>
            <IconButton
              onClick={async () => {
                await AuthService.logout();
              }}
            >
              <LogoutIcon className="sidebar__headerIcon" />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon className="sidebar__headerIcon" />
          <input
            value={searchInput}
            type="text"
            placeholder="Search or start new chat"
            onChange={(e) => search(e.target.value)}
          />
        </div>
        {searchInput && <SearchDialog />}
      </div>
      <div className="sidebar__chats">
        {chats.map((chat) => (
          <SidebarChat
            key={chat.id}
            user={chat.withUser}
            lastMessage={chat.lastMessage.message}
            chat={chat}
            you={chat.lastMessage.name === user.username}
          />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
