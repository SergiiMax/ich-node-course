const http = require('http')

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain')
     res.statusCode = 200
     res.end('Hello friend')
})

server.listen(3000,'127.0.0.1', () => {
    console.log('server is listening on port 3000');
    
})