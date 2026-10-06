import express from 'express'
import 'dotenv/config'
import sequelize from './config/db.js'


const PORT = process.env.PORT || 3000

const app = express()
app.use(express.json())
app.use(express.urlencoded())

app.get('/', (_req ,res) => {
    res.send('Home Page!!!');
})

async function start() {
    try {
        await sequelize.authenticate()
        app.listen(PORT, () => {
            console.log(`Server running at http://localhost:${PORT}`);
        })
    } catch (error) {
        console.error('Failed to connect to the database: ', error.message)
    }
}