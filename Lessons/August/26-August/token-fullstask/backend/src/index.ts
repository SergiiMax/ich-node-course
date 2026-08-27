import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import sequelize from "./db/connection.js";
import authRouter from './routes/auth.js';
import postRouter from './routes/posts.js'
import cors from 'cors';

dotenv.config()

const app = express()

// Список разрешённых origin'ов фронта.
// При credentials: true нельзя ставить '*' — браузер отклонит такой ответ.
const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
    .split(',')
    .map((o) => o.trim());

app.use(cors({
    origin: allowedOrigins,
    credentials: true, // разрешаем браузеру слать и принимать куки в cross-origin запросах
}));

app.use(express.json())
app.use(cookieParser())

const PORT = process.env.PORT || 3000;
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully');
    } catch (error) {
        console.error('Unable to connect to the database:', (error as Error).message);
    }
});
