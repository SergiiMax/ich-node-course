import http from "http";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  const authorization = req.headers.authorization;
  if (!authorization) {
    res.statusCode = 401;
    res.setHeader(`Content-Type`, "text/plain");
    res.end("Unauthorized");
    return
  }
  res.statusCode = 200;
  res.setHeader(`Content-Type`, "text/plain");
  res.end("Authorization header received");
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
});
