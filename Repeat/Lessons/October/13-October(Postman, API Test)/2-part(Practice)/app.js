import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import sequelize from './db/connection.js';
import itemRoutes from './routes/itemRoutes.js';

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/items', itemRoutes);

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`App is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('db error', error.message);
  }
};

start();