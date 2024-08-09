import React from "react";
import "./Message.css";

const Message = ({ author, imgAuthor, date, text }) => {
  return (
    <div className="message">
      <img className="img-profile" src={imgAuthor} alt={author} />
      <div className="message-content">
        <span className="username"> {author}</span>
        <span className="hour"> {new Date(date).toLocaleTimeString()}</span>
        <p className="text-message">{text}</p>
      </div>
    </div>
  );
};

export default Message;
