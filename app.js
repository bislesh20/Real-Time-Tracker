const express = require("express");
const app = express();
const socketio = require("socket.io");
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000;

app.set("view engine", "ejs");
app.use(express.static(path.resolve("./public")));
app.get("/", (req, res) => {
  res.render("index");
});
io.on("connection", function (socket) {
  socket.on("send-location", function (data) {
    io.emit("recieve-location", { id: socket.id, ...data });
  });
  console.log("connected");
  socket.on("disconnect", function () {
    io.emit("user-disconnect", socket.id);
  });
});
server.listen(PORT, () => {
  console.log("Server Listening...");
});
