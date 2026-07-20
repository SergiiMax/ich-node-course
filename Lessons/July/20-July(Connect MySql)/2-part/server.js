import express from 'express';
import sequelize from './db/connection.js';
import usersRouter from './routes/users.js';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', usersRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
});