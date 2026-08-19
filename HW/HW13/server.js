import express from "express";
import "dotenv/config"
import connectionDB from "./config/connection.js"

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
await connectionDB()

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})