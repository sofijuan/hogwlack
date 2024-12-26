import React from 'react';
import './Message.css';

const Message = ({ author, imgAuthor, date, text, loggedUserMessage }) => {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth() + 1;
  const year = newDate.getFullYear();
  const hours = newDate.getHours();
  const minutes = newDate.getMinutes();
  const seconds = newDate.getSeconds();

  const formattedDate =
    String(day).padStart(2, '0') +
    '-' +
    String(month).padStart(2, '0') +
    '-' +
    year +
    ' ' +
    String(hours).padStart(2, '0') +
    ':' +
    String(minutes).padStart(2, '0') +
    ':' +
    String(seconds).padStart(2, '0');

  return (
    <div className={`message ${loggedUserMessage ? 'message-me' : ''}`}>
      <img className="img-profile" src={imgAuthor} alt={author} />
      <div className="message-content">
        <span className="username"> {author}</span>
        <span className="hour"> {formattedDate}</span>
        <p className="text-message">{text}</p>
      </div>
    </div>
  );
};

export default Message;
