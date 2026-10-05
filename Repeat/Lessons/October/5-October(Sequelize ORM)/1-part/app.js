import express, { urlencoded } from 'express'
import 'dotenv/config'
import sequelize from './config/db.js';

const PORT = process.env.PORT || 3000

const app = express()

app.use(express.json());
app.use(express.urlencoded())

app.get('/', (_req, res) => {
    res.send('Home Page')
})

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate()
        console.log('Connection to the database has been successfully');
        console.log(`Server running at http://localhost:${PORT}`);
    } catch (error) {
        console.error("Unable to connect to the database: ", error.message)
    }
})