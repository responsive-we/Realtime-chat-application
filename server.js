const express = require("express");
const app = express();
const http = require("http").createServer(app);
const req = require("express/lib/request");
const { Socket } = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});

app.use(express.static(__dirname + "/css"));
app.use(express.static(__dirname + "/js"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

//Socket
const io = require("socket.io")(http);
io.on("connection", (socket) => {
  console.log("Connected");
  socket.on("message", (msg) => {
    socket.broadcast.emit("message", msg);
  });
  socket.on("new-user", (name) => {
    socket.broadcast.emit("new-user", name);
  });
});
