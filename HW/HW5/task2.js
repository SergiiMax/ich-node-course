import http from 'http'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

const server = http.createServer((req, res) => {
    try {
        throw new Error('Test error')
    } catch (err) {
        fs.appendFile('errors.log', `${new Date().toISOString()} - ${err.message}\n`, (error) => {
            if (error) {
                console.error('Error during writing to log file: ', error)
            }
        })
        res.statusCode = 500
        res.setHeader('Content-type', 'text/plain')
        res.end('Internal Server Error')
    }
})

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})