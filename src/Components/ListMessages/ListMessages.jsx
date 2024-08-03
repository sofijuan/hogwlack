import React from "react";
import Message from "../Message/Message";

const ListMessages = ({ messages }) => {
  return (
    <>
      {messages.map((message) => (
        <Message
          key={message.id}
          author={message.author}
          imgAuthor={message.imgAuthor}
          date={message.date}
          text={message.text}
        />
      ))}
    </>
  );
};

export default ListMessages;
