import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";
import Message from "./models/Message.js";

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;
const HISTORY_LIMIT = 50;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Открываем доступ к статическим файлам в папке public по адресу http://localhost:3000
app.use(express.static("public"));

app.use(express.json());

// app.get('/', (_req, res, _next) => {
//     res.send('Home page');
// });

app.post("/data", (req, res, _next) => {
  const { data } = req.body ?? {};
  if (!data) {
    return res.status(400).json({
      error: "The data was not transmitted.",
    });
  }
  res.json({
    message: "Data received",
    data,
  });
});

// Код для socket.io
// io - это сервер Socket.io
// socket - это экземпляр текущего подключения для конкретного клиента
// socket.broadcast - это флаг "разослать всем, кроме клиента текущего соединения"
let onlineCount = 0;
io.on("connection", async (socket) => {
  onlineCount++;
  console.log(`A user connected (${socket.id}. Online: ${onlineCount})`);
  io.emit("online", onlineCount);

  // 1. Отправляем историю сообщений из БД новому клиенту
  try {
    const history = await Message.find()
      .sort({ createdAt: -1 })
      .limit(HISTORY_LIMIT);
    socket.emit("history", history).reverse(); // возможно потребуется метод history.reverse()
  } catch (error) {
    console.error("History loading error", error.message);
  }

  // 2. Пользователь представился
  socket.on("join", (name) => {
    socket.data.name = String(name || "").trim() || "Anonymus"; //.slice(0, 30)
    socket.broadcast.emit("system", `${socket.data.name} вошел в чат`);
  });

  // 3. Новые сообщения. Сохраняем в БД и рассылаем всем.
  // ack - функция подтверждения операции которая приходит со стороны клиента
  socket.on("message", async (text, ack) => {
    try {
      if (typeof text !== "string") {
        return ack?.({ ok: false, error: "Invalid message format" });
      }

      const message = await Message.create({
        author: socket.data.name || "Anonymus",
        text,
      });
      io.emit("message", message.toObject());
      ack?.({ ok: true });
    } catch (error) {
      console.error("Connection error", error.message);
    }
  });

  // 4. Индикатор "печатает..."
  socket.on("typing", () => {
    if (socket.data.name) {
      socket.broadcast.emit("typing", socket.data.name);
    }
  });

  // 5. Отключение
  socket.on("disconnect", () => {
    onlineCount--;
    console.log(`A user disconnected (${socket.id}. Online: ${onlineCount})`);
    io.emit("online", onlineCount);
    if (socket.data.name) {
      socket.broadcast.emit("system", `${socket.data.name} вышел из чата`);
    }
  });
});

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB connected");

    server.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
}

start();
