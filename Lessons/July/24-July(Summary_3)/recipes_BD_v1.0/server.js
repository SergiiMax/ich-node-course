import express from 'express';
import sequelize from './db/connection.js';
import recipesRouter from './db/routes/recipes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/recipes', recipesRouter);


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
});