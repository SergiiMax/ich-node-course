import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/users.js';
import { sequelize } from './db/connection.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || 'Recipes';

app.use(cors());
app.use(express.json());

app.use('/users', userRouter);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');

    app.listen(PORT, () => {
      console.log(`${APP_NAME} is running on ${PORT} port.`);
    });
  } catch (error) {
    console.error('Unable to connect to database:', error.message);
  }
}

startServer();
