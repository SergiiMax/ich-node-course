import http from "http";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
  res.setHeader("Content-type", "text/plain");
  if (req.method === "POST") {
    if (req.url === "/submit") {
      res.statusCode = 200;
      res.end("Form submitted!!!");
      return;
    } else {
      res.statusCode = 404;
      res.end("404 Not Found Page");
      return;
    }
  }

  if (req.method !== "POST" && req.method !== "GET") {
    res.statusCode = 405;
    res.end("405 method not allowed");
    return;
  }

  if (req.url === "/") {
    res.statusCode = 200;
    res.end("Main Page");
    return;
  } else if (req.url === "/about") {
    res.statusCode = 200;
    res.end("About Us Page");
    return;
  } else if (req.url === "/contact") {
    res.statusCode = 200;
    res.end("Contacts Page");
    return;
  } else {
    res.statusCode = 404;
    res.end("404 Not Found Page");
    return;
  }
});

server.listen(PORT, () => {
  console.log(`Server is listening at PORT ${PORT}`);
});
