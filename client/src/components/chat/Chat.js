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

const Chat = () => {
  const [msg, setMsg] = useState("");
  const messages = useSelector(selectMessages);
  const user = useSelector(selectLoggedInUser);
  const openedChat = useSelector(selectOpenedChat);
  const dispatch = useDispatch();
  const sendMessage = async () => {
    const newMsg = {
      name: user.username,
      message: msg,
      timestamp: new Date().toUTCString(),
      chatId: openedChat.id,
      seen: false,
      to: openedChat.withUser,
    };

    console.log("IDEE poost");
    const response = await axios
      .post("/api/messages", newMsg, { withCredentials: true })
      .catch((err) => console.log(err));

    if (response.status === 201) {
      dispatch(newMessage(response.data));
    }

    setMsg("");
  };

  async function submit(e) {
    e.preventDefault();
    await sendMessage();
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

      <div className="chat__body">
        {messages.map((message) => {
          return (
            <p
              key={message._id}
              className={`chat__message ${
                message.name === user.username && "chat__receiver"
              }`}
            >
              <span className="chat__name">{message.name}</span>
              {message.message}
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
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
