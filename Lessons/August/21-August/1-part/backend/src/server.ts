import express from "express"
import "dotenv/config"
import cors from "cors"
import postRouter from "./routes/postRoutes.js"
import { connectDB } from "./config/db.js"

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use('/posts', postRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})