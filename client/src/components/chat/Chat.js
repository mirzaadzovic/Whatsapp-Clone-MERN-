import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Icon, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./Chat.css";
import { useDispatch, useSelector } from "react-redux";
import {
  newMessage,
  selectMessages,
  selectOpenedChat,
} from "../../reducers/chatSlice";
import { selectLoggedInUser } from "../../reducers/userSlice";
import axios from "../../axios";
import APIService from "../../services/APIService";
import Message from "../Message/Message";
import dateDiff from "../../helpers/dateDiff";

const Chat = () => {
  const [msg, setMsg] = useState("");
  const messages = useSelector(selectMessages);
  const user = useSelector(selectLoggedInUser);
  const openedChat = useSelector(selectOpenedChat);
  // const dispatch = useDispatch();

  const sendMessage = async () => {
    const newMsg = {
      name: user.username,
      message: msg,
      timestamp: new Date(),
      chatId: openedChat.id,
      seen: false,
      to: openedChat.withUser,
    };

    await APIService.post("/api/messages", newMsg);
    setMsg("");

    await APIService.put("/api/chats", { id: openedChat.id, message: newMsg });

    // if (response.status === 201) {
    //   dispatch(newMessage(response.data));
    // }
  };

  async function submit(e) {
    e.preventDefault();
    if (msg) await sendMessage();
  }
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={openedChat?.withUser?.avatarUrl} />

        <div className="chat__headerInfo">
          <h3>{openedChat?.withUser?.username}</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerIcons">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__messages">
        {messages.map((message, idx) => {
          return (
            <Message
              message={message}
              receiver={message.name === user.username}
              key={idx}
            />
          );
        })}
      </div>

      <div className="chat__footer">
        <IconButton>
          <InsertEmoticonIcon />
        </IconButton>

        <form onSubmit={submit}>
          <input
            placeholder="Type a message"
            type="textarea"
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
          />
        </form>

        {msg && (
          <IconButton
            className="chat__sendBtn"
            disabled={!msg}
            onClick={() => sendMessage()}
          >
            <SendIcon />
          </IconButton>
        )}

        <IconButton>
          <MicIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default Chat;
