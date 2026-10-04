import http from "http";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT;

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')

    if (req.method === 'PUT') {
        res.statusCode = 200
        res.end('PUT-запрос обработан')
    } else if (req.method === 'DELETE') {
        res.statusCode = 200
        res.end('DELETE-запрос обработан')
    } else {
        res.statusCode = 405
        res.setHeader('Allow', 'PUT, DELETE')
        res.end('Method Not Allowed')
    }
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})