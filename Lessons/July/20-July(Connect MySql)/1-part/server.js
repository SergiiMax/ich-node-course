import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import userRouter from './routes/users.js'
import sequelize from './db/connection.js'



const app = express()
app.use(express.json())
const PORT = process.env.PORT || 3000;

app.use('/users', userRouter)



app.listen(PORT, async () => {
    console.log(`Listening on ${PORT}`)
    try {
        await sequelize.authenticate()
    } catch (e) {
        console.error("Unable to connect to the database", e.message)
    }
});