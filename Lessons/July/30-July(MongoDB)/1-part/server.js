import express from "express"
import "dotenv/config"
import { connectDB } from "./config/connection.js"
import authRoutes from "./routes/authRoutes.js"

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/auth', authRoutes)

const start = async () => {
    try{
        await connectDB()
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`);
        })
    } catch (error) {
        console.error("Failed to start server", error.message)
    }
}

start()