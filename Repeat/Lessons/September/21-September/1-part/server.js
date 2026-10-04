const http = require('http')

const server = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
    res.end('Request recieved\n')
})

server.listen(3000, '127.0.0.1', () => {
    console.log('Server rinning at http://127.0.0.1:3000');
})