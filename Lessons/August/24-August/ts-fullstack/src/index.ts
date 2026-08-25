import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import sequelize from './db/connection';
import usersRouter from './routes/users';

const app = express();
app.use(express.json())
const PORT = Number(process.env.PORT) || 3000;


app.use('/users', usersRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err);
  res.status(500).json({ error: err.message });
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error(
      'Unable to connect to the database:',
      error instanceof Error ? error.message : error
    );
  }
});
