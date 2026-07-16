const http = require('http')

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    if(req.url === '/') {
        res.statusCode = 200
        res.end("Welcome to the Home Page!")
    } else if(req.url === '/about') {
        res.statusCode === 200
        res.end("About Us")
    } else {
        res.statusCode === 404
        res.end("404 Not Found")
    }
})

server.listen(3000, '127.0.0.1', () => {
    console.log('server is listening on port 3000');
})