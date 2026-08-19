import express from "express";
import http from "http";
import { Server } from "socket.io";
import "dotenv/config";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("message", (msg) => {
    console.log("Message received: " + msg);
    socket.emit("reply", "Message received loud and clear!");
  });
});

server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
