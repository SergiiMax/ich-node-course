import express from 'express';
import sequelize from './config/db.js';
import usersRouter from './routes/users.js';
import postsRouter from './routes/posts.js';

const app = express();
const port = process.env.PORT || 3333;

// Разбираем JSON из тела POST- и PATCH-запросов.
app.use(express.json());

// Подключаем маршруты с общими префиксами.
app.use('/users', usersRouter);
app.use('/posts', postsRouter);

// Проверяем, что сервер запущен.
app.get('/', (req, res) => {
  res.send('Hello, Sequelize with Express!');
});

// Возвращаем понятную ошибку вместо HTML-стека Express.
app.use((error, req, res, next) => {
  console.error(error.parent?.sqlMessage || error.message);

  res.status(500).json({
    message: error.parent?.sqlMessage || error.message,
  });
});

app.listen(port, async () => {
  try {
    // Перед запуском проверяем подключение к MySQL.
    await sequelize.authenticate();
    console.log('Connection to the database established successfully.');
    console.log(`Server is running at http://127.0.0.1:${port}`);
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
});
