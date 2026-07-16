import express from 'express'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT

const app = express()

app.get('/', (req, res) => {
    res.send('Hello world')
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})