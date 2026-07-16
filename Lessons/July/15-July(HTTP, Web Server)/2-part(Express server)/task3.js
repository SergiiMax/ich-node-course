import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT
const app = express()

app.get('/', (req, res) => {
    res.send('Hello, World!')
})

app.get('/users', (req, res) => {
    res.send('List of users')
})

app.get('/users/:id', (req, res) => {
    const userId = req.params.id
    res.send(`User ID: ${userId}`)
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})