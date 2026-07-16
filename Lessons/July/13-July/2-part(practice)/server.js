import http from "http";

const server = http.createServer((req, res) => {
    if (req.method === "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Only GET requests are allowed",
      }),
    );
    return;
  }
   else if (req.url === "/user") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        name: "Alex",
        age: 24,
        country: "Brazil",
      }),
    );
    return;
  } else if (req.url === "/skills") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        skills: ["HTML", "CSS", "JavaScript", "Node.js"],
      }),
    );
    return;
  } else if (req.url === "/") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        message: "Welcome",
      }),
    );
    return;
  }
     else {
    res.statusCode = 404;
    res.end("404 Not Found");
    return;
  }
});

server.listen(3333, '127.0.0.1', () => {
    console.log('Server is listening on port 3333');
})