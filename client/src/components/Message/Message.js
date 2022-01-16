import React from "react";
import { useSelector } from "react-redux";
import dateFormatter from "../../helpers/dateFormatter";
import { selectLoggedInUser } from "../../reducers/userSlice";
import "./Message.css";

const Message = ({ message, receiver, dateDiff }) => {
  return (
    <p className={`message ${receiver && "message__receiver"}`}>
      {/* <span className="chat__name">{message.name}</span> */}
      {message.message}

      <span className="message__timestamp">
        {dateFormatter(message.timestamp)}
      </span>
    </p>
  );
};

export default Message;
