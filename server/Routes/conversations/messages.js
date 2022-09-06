const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

io.on("connection", (socket) => {
  socket.on("join", (_id) => {
    socket.on("message", (message) => {});
  });
});

const connectToSocket = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  const socket = io();
  const bookClubData = client.db("Book-Club");
  const messagesData = await bookClubData.collection("Users").find().toArray();

  socket.on("chat message", function (msg) {
    var item = document.createElement("li");
    item.textContent = msg;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
  });
};

module.exports = {
  connectToSocket,
};
