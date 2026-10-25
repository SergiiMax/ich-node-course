import express from "express";
import http from "http";
import "dotenv/config";
import { Server } from "socket.io";

const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log(`A user connected ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`User ${socket.id} disconnected`);
  });

  socket.on("chat message", (msg) => {
    console.log(`New message received: ${msg}`);

    socket.emit("message received", `Server received: ${msg}`);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
