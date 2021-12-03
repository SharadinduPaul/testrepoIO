const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const port = process.env.PORT || 2001;
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname)));

io.on("connection", (socket) => {
  socket.emit("msg", "welcome to first socket io app");
  socket.broadcast.emit("msg", "a new user has joined the chat");

  socket.on("disconnect", () => {
    socket.broadcast.emit("msg", "a user has disconnected");
  });
  socket.on("chatmsg", (msg) => {
    // console.log(msg);
    io.emit("chatMessage", msg);
  });
});

server.listen(port, () => console.log(`server is running on port ${port}`));
