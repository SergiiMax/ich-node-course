import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import { router } from './routes/balanceRoutes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

// Сначала подключаемся к базе, потом запускаем сервер.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
  });
});