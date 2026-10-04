import http from 'http'
import fs from 'fs'

const server = http.createServer((req, res) => {
    try {
        throw new Error("Test error")
    } catch (error) {
        fs.appendFile('errors.log', `${new Date().toISOString()} - ${error.message}`, 'utf-8', (err) => {
            if (err) {
                return console.error('Error recieved during writing to log file: ', err.message)
            }
            res.statusCode = 500
            res.setHeader(`Content-Type`, `text/plain`)
            res.end("Internal Server Error")
        })
    }
})

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
})