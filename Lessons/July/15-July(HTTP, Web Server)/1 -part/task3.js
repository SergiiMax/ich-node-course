import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Access-Control-Allow-Origin', '*')

    res.setHeader('Access-Control-Allow-Origin', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Methods', 'Content-type')

    res.setHeader('Content-type', 'applicetion/json')
    res.end(JSON.stringify({ meggage: 'CORS enabled' }))
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})