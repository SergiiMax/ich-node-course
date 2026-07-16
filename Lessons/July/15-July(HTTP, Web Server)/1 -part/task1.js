import http from 'http'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

const server = http.createServer((req, res) => {
    if(req.url === '/') {
        res.statusCode = 200
        res.setHeader('Content-type', 'text/plain')
        res.end('Main Page')
        return
    } else if(req.url === '/about') {
        res.statusCode = 200
        res.setHeader('Content-type', 'text/plain')
        res.end('About Us Page')
        return
    } else if(req.url === '/contacts') {
        res.statusCode = 200
        res.setHeader('Content-type', 'text/plain')
        res.end('Contacts Page')
        return
    } else {
        res.statusCode = 404
        res.end('404 Not Found Page')
        return
    }
})

server.listen(PORT, () => {
    console.log('Server is listening at PORT 3000');
    
})