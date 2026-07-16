const http = require("http");

// const server = http.createServer((req, res) => {
//     console.log('request recieved', req.method, req.url);
//     res.end('hello')
// })
// server.listen(3333)

// server.on('request', () => {
//     console.log('listener');
// })

// пишем сервер с использованием события
const server = http.createServer();
server.on("request", (req, res) => {
  console.log("request recieved", req.method, req.url);
  res.end("hello world");
});

server.on("connection", () => {
  console.log("New TCP Connection");
});

server.on("close", () => {
  console.log("server was stopped");
});

server.listen(3333);
