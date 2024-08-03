import React from "react";
import "./Message.css";

const Message = ({ author, imgAuthor, date, text }) => {
  return (
    <div className="message">
      <img className="img-profile" src={imgAuthor} alt={author} />
      <span className="username"> {author}</span>
      <span> {date}</span>
      <p>{text}</p>
    </div>
  );
};

export default Message;
