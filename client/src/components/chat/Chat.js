import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import SendIcon from "@mui/icons-material/Send";
import { Avatar, Icon, IconButton } from "@mui/material";
import React, { useState } from "react";
import "./Chat.css";

const Chat = ({ messages }) => {
  const [msg, setMsg] = useState("");
  const sendMessage = async () => {
    const data = {
      name: "Mirza",
      message: msg,
      timestamp: new Date().toUTCString(),
      received: false,
    };
    const res = await fetch("http://localhost:8080/api/v1/messages/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    setMsg("");
  };

  async function submit(e) {
    e.preventDefault();
    await sendMessage();
  }
  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />

        <div className="chat__headerInfo">
          <h3>Room name</h3>
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
                !message.received && "chat__receiver"
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
            type="text"
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
