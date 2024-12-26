import React from 'react';
import Message from '../Message/Message';
import './ListMessages.css';

const ListMessages = ({ messages, loggedUserId }) => {
  return (
    <div className="list-messages">
      {messages.map((message) => {
        return (
          <Message
            loggedUserMessage={message.sender._id === loggedUserId}
            key={message._id}
            author={message.sender.username}
            imgAuthor={message.sender.image}
            date={message.createdAt}
            text={message.content}
          />
        );
      })}
    </div>
  );
};

export default ListMessages;
