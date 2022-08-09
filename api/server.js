const express = require("express");
const socket = require("socket.io");
const mongoose = require("mongoose");
const messageRoute = require("./routes/messageRoute");
const app = express();
var cors = require("cors");

app.use(cors());

mongoose
  .connect(
    "mongodb+srv://rbdikmen:vvNgAfRZ5WCUUdvv@cluster0.7krpaqf.mongodb.net/mini-chat-app-db?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/messages", messageRoute);

const server = app.listen(4040);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
});
