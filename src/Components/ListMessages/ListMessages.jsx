import React from "react";
import Message from "../Message/Message";
import "./ListMessages.css";

const ListMessages = ({ messages }) => {
  return (
    <div className="list-messages">
      {messages.map((message) => (
        <Message
          key={message.id}
          author={message.author}
          imgAuthor={message.imgAuthor}
          date={message.date}
          text={message.text}
        />
      ))}
    </div>
  );
};

export default ListMessages;
