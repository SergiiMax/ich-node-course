# ts-fullstack

Пошаговая инструкция по настройке проекта: Express + Sequelize + MySQL на **TypeScript**.

## 1. Инициализация проекта

```bash
npm init -y
```

В `package.json` оставляем `"type": "commonjs"` (в TS-версии это удобнее: миграции sequelize-cli остаются обычными CommonJS-файлами и не конфликтуют с ESM):

```json
{
  "type": "commonjs"
}
```

## 2. Установка библиотек

```bash
npm install express sequelize mysql2 dotenv bcryptjs jsonwebtoken
```

```bash
npm install -D typescript tsx sequelize-cli @types/express @types/node @types/jsonwebtoken
```

- **express** — веб-фреймворк, роуты и сервер
- **sequelize** — ORM для работы с БД
- **mysql2** — драйвер для подключения к MySQL
- **dotenv** — подгрузка переменных окружения из `.env`
- **bcryptjs** — хеширование паролей
- **jsonwebtoken** — выпуск и проверка JWT
- **typescript** — компилятор `tsc`
- **tsx** — запуск `.ts` напрямую, без предварительной сборки
- **sequelize-cli** — CLI для генерации и запуска миграций/моделей/сидов
- **@types/\*** — типы для express, Node и jsonwebtoken (у `bcryptjs` с 3-й версии типы свои)

## 3. Файл `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "node18",
    "rootDir": "src",
    "outDir": "dist",
    "strict": true,
    "types": ["node"],
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "sourceMap": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist", "src/db/migrations", "src/db/seeders"]
}
```

Миграции и сиды исключены из компиляции: это `.cjs`-файлы, их запускает CLI напрямую.

`"types": ["node"]` подключает глобальные типы Node (`process`, `Buffer`, `__dirname`). Поле влияет только на глобальные типы — на типы express и jsonwebtoken оно не действует: те приезжают через обычный `import` из пакета.

Скрипты в `package.json`:

```json
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js",
    "typecheck": "tsc --noEmit",
    "db:migrate": "sequelize-cli db:migrate"
  }
}
```

## 4. Файл `.env`

Создать в корне проекта файл `.env` с параметрами подключения к БД и секретом для токенов:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ваш_пароль
DB_NAME=ts_fullstack_db
DB_DIALECT=mysql
PORT=3000

JWT_SECRET=случайная_длинная_строка
JWT_EXPIRES_IN=7d
```

Секрет удобно сгенерировать так:

```bash
node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
```

Не забыть добавить `.env`, `node_modules` и `dist` в `.gitignore`.

## 5. Типы переменных окружения (`src/types/env.d.ts`)

В TypeScript `process.env.X` имеет тип `string | undefined`, а `dialect` ждёт не любую строку, а тип `Dialect`. Поэтому код из JS-версии подсвечивается ошибками. Опишем переменные окружения один раз — и дальше пользуемся ими как обычными строками:

```ts
import type { Dialect } from 'sequelize';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_HOST: string;
      DB_PORT: string;
      DB_USER: string;
      DB_PASSWORD: string;
      DB_NAME: string;
      DB_DIALECT: Dialect;
      PORT?: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN?: string;
    }
  }
}

export {};
```

Файл ничего не проверяет в рантайме — это обещание компилятору, что переменные в `.env` заданы. Плата за красивый код: если забыть переменную в `.env`, TS промолчит, а упадёт уже подключение к БД.

## 6. Подключение к БД (`src/db/connection.ts`)

После этого файл выглядит один в один как в JS-версии:

```ts
import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: process.env.DB_DIALECT,
  }
);

export default sequelize;
```

`port` всё равно оборачиваем в `Number()` — Sequelize ждёт там число, а в `.env` всё строки.

## 7. Инициализация sequelize-cli

CLI ничего не знает про TypeScript, поэтому вместо `config/config.json` даём ему CommonJS-конфиг, читающий `.env`.

`.sequelizerc` в корне проекта:

```js
const path = require('path');

module.exports = {
  config: path.resolve('src', 'config', 'config.cjs'),
  'models-path': path.resolve('src', 'db', 'models'),
  'migrations-path': path.resolve('src', 'db', 'migrations'),
  'seeders-path': path.resolve('src', 'db', 'seeders'),
};
```

`src/config/config.cjs`:

```js
'use strict';

require('dotenv/config');

const base = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  dialect: process.env.DB_DIALECT || 'mysql',
};

module.exports = {
  development: base,
  test: base,
  production: base,
};
```

Базу данных создать один раз вручную — миграции её не создают:

```bash
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS ts_fullstack_db"
```

## 8. Создание миграции

Сгенерировать файл-заготовку миграции:

```bash
npx sequelize-cli migration:generate --name create-users
```

CLI создаст файл в `src/db/migrations/` с расширением `.js` — переименовать его в `.cjs` и описать структуру таблицы в `up`/`down`:

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

`STRING` — это `VARCHAR(255)`, bcrypt-хеш занимает 60 символов, так что отдельная миграция под хеш не нужна.

## 9. Запуск миграции

```bash
npx sequelize-cli db:migrate
```

Полезные команды:

```bash
npx sequelize-cli db:migrate:status     # статус миграций
npx sequelize-cli db:migrate:undo       # откатить последнюю
npx sequelize-cli db:migrate:undo:all   # откатить все
```

## 10. Модель (`src/db/models/user.ts`)

Модель привязываем к существующему инстансу `sequelize`, а поля типизируем через `InferAttributes`/`InferCreationAttributes`. Пароль хешируется в хуке `beforeSave` — в БД чистый пароль не попадает никогда.

```ts
import bcrypt from 'bcryptjs';
import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import sequelize from '../connection';

const SALT_ROUNDS = 10;

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  comparePassword(plain: string): Promise<boolean> {
    return bcrypt.compare(plain, this.password);
  }
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    hooks: {
      async beforeSave(user) {
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, SALT_ROUNDS);
        }
      },
    },
  }
);

export default User;
```

`declare` вместо обычных полей — важно: иначе TS создаст реальные свойства класса и они перекроют геттеры Sequelize.
`CreationOptional` помечает поля, которые при создании передавать не нужно.
Проверка `user.changed('password')` нужна, чтобы при обновлении других полей хеш не хешировался повторно.

## 11. Токены (`src/utils/jwt.ts`)

```ts
import 'dotenv/config';
import jwt, { type SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = (process.env.JWT_EXPIRES_IN ?? '7d') as SignOptions['expiresIn'];

export interface TokenPayload {
  id: number;
  email: string;
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, JWT_SECRET) as TokenPayload;
}
```

`JWT_SECRET` здесь тоже обычная строка — благодаря `env.d.ts` из шага 5.

## 12. Middleware авторизации (`src/middleware/auth.ts`)

```ts
import type { NextFunction, Request, Response } from 'express';
import { verifyToken, type TokenPayload } from '../utils/jwt';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export function auth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;

  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Нужен заголовок Authorization: Bearer <token>' });
  }

  try {
    req.user = verifyToken(header.slice('Bearer '.length));
    next();
  } catch {
    return res.status(401).json({ error: 'Невалидный или просроченный токен' });
  }
}
```

Блок `declare global` расширяет тип `Request` — после него `req.user` виден во всех роутах.

## 13. Роуты (`src/routes/users.ts`)

```ts
import { Router, type Request, type Response } from 'express';
import User from '../db/models/user';
import { auth } from '../middleware/auth';
import { signToken } from '../utils/jwt';

const router = Router();

interface CreateUserBody {
  name?: string;
  email?: string;
  password?: string;
}

interface LoginBody {
  email?: string;
  password?: string;
}

router.get('/', async (_req: Request, res: Response) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });
  res.json(users);
});

// Регистрация
router.post(
  '/',
  async (req: Request<unknown, unknown, CreateUserBody>, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'name, email и password обязательны' });
    }

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(409).json({ error: 'Пользователь с таким email уже существует' });
    }

    const user = await User.create({ name, email, password });
    const { password: _, ...safe } = user.toJSON();
    res.status(201).json({ user: safe, token: signToken({ id: user.id, email: user.email }) });
  }
);

// Логин
router.post(
  '/login',
  async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'email и password обязательны' });
    }

    const user = await User.findOne({ where: { email } });
    // одинаковый ответ на «нет юзера» и «неверный пароль» — чтобы не палить наличие email
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Неверный email или пароль' });
    }

    const { password: _, ...safe } = user.toJSON();
    res.json({ user: safe, token: signToken({ id: user.id, email: user.email }) });
  }
);

// Текущий пользователь по токену
router.get('/me', auth, async (req: Request, res: Response) => {
  const user = await User.findByPk(req.user!.id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) {
    return res.status(404).json({ error: 'Пользователь не найден' });
  }

  res.json(user);
});

export default router;
```

Дженерик `Request<unknown, unknown, Body>` типизирует `req.body`; поля в нём опциональные, потому что клиент может прислать что угодно — отсюда и проверки.

## 14. Подключение в `src/index.ts`

```ts
import 'dotenv/config';
import express, { type NextFunction, type Request, type Response } from 'express';
import sequelize from './db/connection';
import usersRouter from './routes/users';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());
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
```

В `catch` тип ошибки — `unknown`, поэтому перед обращением к `.message` проверяем `error instanceof Error`.

## 15. Запуск проекта

Разработка (watch, без сборки):

```bash
npm run dev
```

Прод-сборка:

```bash
npm run build && npm start
```

Проверка типов без компиляции:

```bash
npm run typecheck
```

## 16. Проверка эндпоинтов

| Метод | Путь           | Описание                                  |
| ----- | -------------- | ----------------------------------------- |
| GET   | `/users`       | список пользователей (без паролей)        |
| POST  | `/users`       | регистрация, возвращает `{ user, token }` |
| POST  | `/users/login` | логин, возвращает `{ user, token }`       |
| GET   | `/users/me`    | текущий юзер, требует `Authorization`     |

Регистрация:

```bash
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Yury","email":"yury@example.com","password":"secret123"}'
```

Логин:

```bash
curl -X POST http://localhost:3000/users/login -H "Content-Type: application/json" -d '{"email":"yury@example.com","password":"secret123"}'
```

Запрос с токеном:

```bash
curl http://localhost:3000/users/me -H "Authorization: Bearer <token>"
```

Список пользователей:

```bash
curl http://localhost:3000/users
```

## Структура проекта

```
src/
  index.ts              — точка входа, express-приложение
  config/config.cjs     — конфиг для sequelize-cli (читает .env)
  db/connection.ts      — инстанс Sequelize
  db/models/user.ts     — модель User, хеш пароля, comparePassword
  db/migrations/*.cjs   — миграции (CommonJS, их запускает CLI)
  middleware/auth.ts    — проверка JWT из заголовка Authorization
  routes/users.ts       — роуты /users
  types/env.d.ts        — типы переменных окружения
  utils/jwt.ts          — подпись и проверка токенов
.sequelizerc            — пути для sequelize-cli
tsconfig.json           — настройки компилятора
```
