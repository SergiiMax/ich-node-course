import http from "http";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
    if (req.method === 'PUT') {
        res.statusCode = 200
        res.setHeader('Content-type', 'text/plain')
        res.end('PUT-запрос обработан')
    }
    if (req.method === 'DELETE') {
        res.statusCode = 200
        res.setHeader('Content-type', 'text/plain')
        res.end('DELETE-запрос обработан')
    }
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})