import React from "react";
import { IconButton, Avatar } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./SearchUser.css";
import { newChat, selectChats } from "../../../../reducers/chatSlice";
import { useDispatch, useSelector } from "react-redux";
import { setSearchInput } from "../../../../reducers/searchSlice";
const SearchUser = ({ user }) => {
  const dispatch = useDispatch();
  const chats = useSelector(selectChats);

  const addChat = async () => {
    const chat = {
      id: user.id,
      withUser: user,
      lastMessage: { message: "No messages" },
    };
    dispatch(setSearchInput(""));
    dispatch(newChat(chat));
  };
  return (
    <div className="searchUser">
      <Avatar src={user.avatarUrl} />
      <h5>{user.username}</h5>

      <IconButton onClick={addChat}>
        <AddCircleOutlineIcon />
      </IconButton>
    </div>
  );
};

export default SearchUser;
