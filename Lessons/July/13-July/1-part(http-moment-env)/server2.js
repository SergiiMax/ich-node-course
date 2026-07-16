// Создать сервер со следующими маршрутами.
// GET /
// {
//   "message": "Server is running"
// }

// GET /about
// Возвращает
// {
//   "name": "Node.js Server",
//   "version": "1.0.0"
// }

// GET /time
// Возвращает текущее время.
// Например
// {
//   "time": "2026-07-13T09:30:00.000Z"
// }

// Все остальные маршруты
// Статус
// 404
// Ответ
// {
//   "message": "Route not found"
// }
// Обязательно использовать dotenv для инициализации порта

import http from "http";
import moment from "moment";
import dotenv from 'dotenv'
dotenv.config()

const now = moment().format("MMMM Do YYYY, h:mm:ss a");
const PORT = process.env.PORT
const HOST = process.env.HOST

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "Server is running" }));
    return;
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        name: "Node.js Server",
        version: "1.0.0",
      }),
    );
    return;
  } else if (req.url === "/time") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        time: now,
      }),
    );
    return;
  } else {
    res.statusCode === 404;
    res.end("404 Not Found");
    return;
  }
});

server.listen(PORT, HOST, () => {
    console.log(`server is listening on port ${PORT} or Host ${HOST}`);
})

 