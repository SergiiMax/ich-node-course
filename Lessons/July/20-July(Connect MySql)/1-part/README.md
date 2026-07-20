# 08-june-mysql-seq

Пошаговая инструкция по настройке проекта: Express + Sequelize + MySQL.

## 1. Инициализация проекта

```bash
npm init -y
```

В `package.json` добавить `"type": "module"`, чтобы можно было использовать `import/export`:

```json
{
  "type": "module"
}
```

## 2. Установка библиотек

```bash
npm install express sequelize mysql2 dotenv
npm install sequelize-cli
```

- **express** — веб-фреймворк, роуты и сервер
- **sequelize** — ORM для работы с БД
- **mysql2** — драйвер для подключения к MySQL
- **dotenv** — подгрузка переменных окружения из `.env`
- **sequelize-cli** — CLI для генерации и запуска миграций/моделей/сидов

## 3. Файл `.env`

Создать в корне проекта файл `.env` с параметрами подключения к БД:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ваш_пароль
DB_NAME=mysql_seq_db
DB_DIALECT=mysql
```

Не забыть добавить `.env` и `node_modules` в `.gitignore`.

## 4. Подключение к БД (`db/connection.js`)

```js
import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

export default sequelize;
```

## 5. Инициализация sequelize-cli (`sequelize-cli init`)

Запускаем из корня проекта:

```bash
npx sequelize-cli init
```

Эта команда сгенерирует стандартную структуру:

```
config/config.json
migrations/
models/
seeders/
```

## 7. Создание миграции

Сгенерировать файл-заготовку миграции:

```bash
npx sequelize-cli migration:generate --name create-users
```

Cli создаст файл в `db/migrations/` с расширением `.js` — переименовать его в `.cjs` (чтобы Node не пытался читать его как ES-модуль) и описать структуру таблицы в `up`/`down`:

```js
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false, unique: true },
      password: { type: Sequelize.STRING, allowNull: false },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('users');
  },
};
```

## 8. Запуск миграции

```bash
npx sequelize-cli db:migrate
```

Полезные команды:

```bash
npx sequelize-cli db:migrate:status     # статус миграций
npx sequelize-cli db:migrate:undo       # откатить последнюю
npx sequelize-cli db:migrate:undo:all   # откатить все
```

## 9. Модель (`db/models/user.js`)

Модель пишем как обычный ES-модуль, привязывая к существующему инстансу `sequelize`:

```js
import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';

class User extends Model {}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
  }
);

export default User;
```

## 10. Роуты (`routes/users.js`)

```js
import { Router } from 'express';
import User from '../db/models/user.js';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json(user);
});

export default router;
```

## 11. Подключение в `index.js`

```js
import express from 'express';
import sequelize from './db/connection.js';
import usersRouter from './routes/users.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/users', usersRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
});
```

## 12. Запуск проекта

```bash
npm start
```

Проверка эндпоинтов:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Yury","email":"yury@example.com","password":"secret123"}'

curl http://localhost:3000/users
```
