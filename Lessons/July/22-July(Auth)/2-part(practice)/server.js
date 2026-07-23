import express from 'express';
import sequelize from './db/connection.js';
import usersRouter from './routes/users.js';
import postRouter from "./routes/posts.js"
import "./db/models/associations.js"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', usersRouter);
app.use('/posts', postRouter)

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
});