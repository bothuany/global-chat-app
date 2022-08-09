import React, { useState, useEffect, useRef } from "react";
import Message from "./components/Message";
import axios from "axios";
import Form from "./components/Form";
import { io } from "socket.io-client";
import Counter from "./components/Counter";

const socket = io.connect(":4040");
const baseURL = "http://localhost:4040/messages";

function App() {
  const bottomRef = useRef(null);

  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView();
  }, [messages]);

  const fetchMessages = () => {
    axios(baseURL)
      .then((res) => setMessages(res.data))
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    fetchMessages();
  }, []);

  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("chat", (data) => {
      setMessages((messages) => [
        ...messages,
        { sender: data.sender, message: data.message, createdAt: Date.now() },
      ]);
    });
    return () => {
      socket.off("chat");
    };
  }, []);

  useEffect(() => {
    setIsConnected(socket.connected);
  }, [socket.connected]);

  return (
    <div id="chat-wrap">
      <h2>Global Chat</h2>
      <div id="chat-window">
        <div id="output">
          {!isConnected && "no"}
          {loading && <div>Loading...</div>}
          {messages.map((message, index) => (
            <Message key={index} message={message}></Message>
          ))}
          <div ref={bottomRef} />
        </div>
        <div id="feedback"></div>
      </div>

      <Form baseURL={baseURL} messages={messages}></Form>
      <Counter messagesLength={messages.length}></Counter>
    </div>
  );
}

export default App;
