const http = require('http')

const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/plain')
    if(req.url === '/') {
        res.statusCode = 200
        res.end('hello world')
    } else if(req.url === '/about') {
        res.statusCode = 200
        res.end('About page')
    } else {
        res.statusCode = 404
        res.end('Not found page')
    }
    //ЭТО НЕ ПРАВИЛЬНЫЙ КОД (механика верная)
    // const {email, login, name, password} = req.body
    // if(!email || !login || !name || !password) {
    //     res.statusCode = 500
    //     res.end('Нет полей')
    // }
})

server.listen(3333, () => {
    console.log('server is listening on port 3333');
})