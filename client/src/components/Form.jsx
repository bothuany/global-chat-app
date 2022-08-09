import React from "react";
import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const socket = io.connect(":4040");

function Form({ baseURL, messages }) {
  const [form, setForm] = useState({ sender: "", message: "" });

  function onChangeInput(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit("chat", {
      sender: form.sender,
      message: form.message,
    });
    axios.post(`${baseURL}/send`, form);
  };

  useEffect(() => {
    setForm({ sender: form.sender, message: "" });
  }, [messages]);
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="sender"
        id="sender"
        placeholder="Name"
        value={form.sender}
        onChange={onChangeInput}
        required
      />
      <input
        type="text"
        name="message"
        id="message"
        placeholder="Message"
        value={form.message}
        onChange={onChangeInput}
        required
      />
      <button type="submit" id="submitBtn">
        Send
      </button>
    </form>
  );
}

export default Form;
