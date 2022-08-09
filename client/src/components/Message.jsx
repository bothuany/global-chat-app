import React from "react";

function Message({ message }) {
  const messageDate = new Date(message.createdAt);
  return (
    <div id="messageContainer">
      <p id="message">
        <strong>{message.sender}:</strong> {message.message}
      </p>
      <span id="messageDate">{`${messageDate.getHours()}:${messageDate.getMinutes()} -
       ${messageDate.getDate()}/${messageDate.getMonth()}/${messageDate.getFullYear()}`}</span>
    </div>
  );
}

export default Message;
