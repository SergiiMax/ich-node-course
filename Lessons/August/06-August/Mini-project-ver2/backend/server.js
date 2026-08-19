import express from 'express';
import sequelize from './db/connection.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import commentRoutes from './routes/commentRoutes.js'
import cors from "cors"
const app = express();
app.use(cors())
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/comments', commentRoutes)

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  } catch(error) {
    console.log(error);
  }
}

startServer();