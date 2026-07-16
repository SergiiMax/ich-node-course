const http = require('http')

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8')
    if(req.url === '/') {
        res.statusCode = 200
        res.end("Welcome to the Home Page!")
        console.log('GET /')
        return
    } else if(req.url === '/about') {
        res.statusCode === 200
        res.end("About Us")
        console.log('GET /about')
        return
    } else if(req.url === '/contacts') {
        res.statusCode === 200
        res.end('Our contacts: example@mail.com')
        console.log('GET /contacts')
        return
    }
    else {
        res.statusCode === 404
        res.end("404 Not Found")
       console.log('GET /test')
       return
    }
})

server.listen(3000, '127.0.0.1', () => {
    console.log('server is listening on port 3000');
})