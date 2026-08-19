# 26.08.12 — регистрация и авторизация на TypeScript

Пошаговая инструкция: Express + Sequelize + MySQL + JWT на TypeScript.
По ходу — мини-документация по конструкциям TS, которых нет в JS-версии проекта.

---

## 1. Инициализация проекта

```bash
npm init -y
```

В `package.json` добавить `"type": "module"`, чтобы работали `import/export`:

```json
{
  "type": "module"
}
```

> **Мини-док: `"type": "module"` и почему это важно именно в TS**
>
> Поле определяет, как Node читает файлы `.js`: как ES-модули (`import`) или как CommonJS (`require`).
> В TypeScript оно влияет ещё и на компиляцию — от него зависит, какой код выдаст `tsc` и по каким
> правилам будут разрешаться пути импортов. Главное следствие для нас — в шаге 11: **относительные
> импорты придётся писать с расширением `.js`**.

---

## 2. Установка библиотек

```bash
npm install express sequelize mysql2 dotenv bcryptjs jsonwebtoken
npm install -D typescript tsx sequelize-cli @types/node @types/express @types/jsonwebtoken nodemon
```

Рантайм-зависимости:

- **express** — веб-фреймворк, роуты и сервер
- **sequelize** — ORM для работы с БД
- **mysql2** — драйвер для подключения к MySQL
- **dotenv** — подгрузка переменных окружения из `.env`
- **bcryptjs** — хэширование паролей
- **jsonwebtoken** — выпуск и проверка JWT-токенов

Инструменты разработки:

- **typescript** — сам компилятор `tsc`
- **tsx** — запуск `.ts` напрямую, без предварительной сборки
- **sequelize-cli** — CLI для миграций/моделей/сидов
- **@types/\*** — файлы деклараций типов для пакетов, написанных на JS

> **Мини-док: что такое `@types/*` и почему их надо ставить отдельно**
>
> `express`, `jsonwebtoken` и сам Node написаны на JavaScript — типов внутри у них нет. Описания
> типов для них живут отдельными пакетами в скоупе `@types` и содержат только файлы `.d.ts`
> (declaration files) — объявления без единой строки исполняемого кода. Компилятор их читает,
> в сборку они не попадают.
>
> `sequelize` и `bcryptjs` типы везут в себе, поэтому `@types/sequelize` ставить не нужно.

---

## 3. Конфиг TypeScript (`tsconfig.json`)

```bash
npx tsc --init
```

Привести к такому виду:

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
  "include": ["src/**/*.ts", "src/db/connection.js"],
  "exclude": ["node_modules", "dist", "src/db/migrations", "src/db/seeders"]
}
```

Разбор ключевых полей:

- **`rootDir` / `outDir`** — исходники в `src`, результат сборки в `dist`
- **`strict`** — включает строгие проверки, в том числе главную для нас: значение типа
  `string | undefined` нельзя передать туда, где ждут `string`
- **`include`** — какие файлы попадают в программу. **Не «что импортируется», а именно «какие файлы
  компилятор берёт»** — файл участвует в проверке, даже если на него никто не ссылается
- **`exclude`** — миграции лежат в `.cjs` и типизации не подлежат, их исключаем

> **Мини-док: `"types": ["node"]` — зачем**
>
> Глобальный объект `process` не описан в самом TypeScript, его объявление лежит в `@types/node`.
> Поле `types` перечисляет, какие пакеты глобальных типов подключить.
>
> Тонкость, на которой легко запутаться: `@types/node` может подтянуться и **без** этого поля —
> если любой файл программы импортирует пакет, чьи типы содержат директиву
> `/// <reference types="node" />`. Так делают `@types/express-serve-static-core` и
> `@types/jsonwebtoken`. То есть один импорт express в любом роуте делает `process` видимым во всём
> проекте, включая файлы, которые про express не знают.
>
> Полагаться на это не стоит: Node — прямая зависимость проекта, и объявлять её транзитивно через
> веб-фреймворк неправильно. Уберёшь роуты — сломаются файлы, которых ты не трогал. Пишем явно.

---

## 4. Файл `.env`

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=ваш_пароль
DB_NAME=auth_db_ts
DB_DIALECT=mysql
PORT=3000

JWT_SECRET=сгенерируй_свой: openssl rand -hex 32
JWT_EXPIRES_IN=7d
```

`.env` и `node_modules` — в `.gitignore`. Рядом положить `.env.example` с теми же ключами, но без
реальных значений: он коммитится и показывает, что нужно настроить.

---

## 5. Типизация переменных окружения (`src/types/env.d.ts`)

**Это тот шаг, которого нет в JS-версии, и без него не собирается шаг 7.**

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

// export {}; не обязательно
```

> **Мини-док: `declare`, `namespace`, `declare global` и слияние деклараций**
>
> **`declare`** означает «этот объект где-то существует, вот его тип». Никакого кода не создаётся —
> это обещание компилятору, что сущность будет доступна в рантайме. Отсюда и расширение `.d.ts`:
> declaration file, файл только с объявлениями.
>
> **`namespace`** — способ сгруппировать типы под общим именем, чтобы они не сталкивались с чужими.
> `@types/node` кладёт свои типы в `NodeJS`, поэтому полное имя нужного нам интерфейса —
> `NodeJS.ProcessEnv`. Для организации своего кода namespace давно не используют (для этого есть
> модули), но при работе с чужими типами без него не обойтись.
>
> **Declaration merging (слияние деклараций)** — ключевая механика. Если объявить `interface` с
> именем, которое уже существует, TypeScript не заменит старый, а **объединит поля**. В `@types/node`
> `ProcessEnv` объявлен как `[key: string]: string | undefined` — «любой ключ, значение строка или
> `undefined`». Мы дописываем в него конкретные ключи с типом `string`, и конкретное объявление
> перекрывает индексную сигнатуру. После этого `process.env.DB_NAME` имеет тип `string`, а не
> `string | undefined`.
>
> **`declare global`** нужен потому, что файл с `import` или `export` — это модуль, и всё внутри него
> локально. `declare global { ... }` пробивает границу модуля и говорит: дополни глобальную область
> видимости. Без обёртки мы объявили бы никому не нужный локальный `NodeJS`.
>
> **`export {}` в конце** — обязательная строчка. Она делает файл модулем, что и требуется для
> `declare global`. Здесь она нужна потому, что сверху уже есть `import type` — но привычка ставить
> её всегда избавит от ошибки `Augmentations for the global scope can only be directly nested in
> external modules`.
>
> **Важное ограничение.** Всё это — обещание, а не проверка. Компилятор верит на слово. Забудешь
> `JWT_SECRET` в `.env` — TS промолчит, а токены начнут подписываться значением `undefined`.
> Типы здесь снимают шум, но не заменяют валидацию окружения на старте.

---

## 6. Подключение к БД (`src/db/connection.ts`)

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

От JS-версии отличий два, и оба неслучайны:

- **`Number(process.env.DB_PORT)`** — в `.env` всё лежит строками по определению формата, а Sequelize
  ждёт `number`. В JS это прокатывало молча, в TS — ошибка.
- **`dialect` без приведения типа** — работает благодаря `DB_DIALECT: Dialect` из шага 5. `Dialect` —
  это union-тип `'mysql' | 'postgres' | 'sqlite' | ...`, обычная строка в него не годится.

> **Мини-док: `import 'dotenv/config'` и текущая директория**
>
> Импорт без фигурных скобок выполняет модуль ради побочного эффекта — здесь чтения `.env`.
> Искать файл dotenv будет **от текущей рабочей директории** (`process.cwd()`), а не от расположения
> `connection.ts`. Значит запускать проект нужно из корня. Зайдёшь в `src` и запустишь оттуда —
> `.env` не найдётся, и все переменные станут `undefined`, несмотря на все типы.

---

## 7. Конфиг для sequelize-cli (`src/db/config/config.cjs`)

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

// Второй вариант, в целом вроде как тоже самое
// module.exports = {
//   development: base,
//   test: { ...base, database: `${process.env.DB_NAME}_test` }, 
//   production: base,
// };
```

Расширение **`.cjs` обязательно**: sequelize-cli грузит конфиг через `require()`, а в проекте с
`"type": "module"` файл `.js` считается ES-модулем и падает с `ERR_REQUIRE_ESM`. Расширение `.cjs`
явно помечает файл как CommonJS.

По той же причине конфиг остаётся на JavaScript, а не на TS: CLI запускается обычным Node, который
`.ts` читать не умеет.

---

## 8. Файл `.sequelizerc`

**Без этого файла CLI не увидит конфиг из шага 7.** По умолчанию sequelize-cli ищет
`config/config.json` в корне проекта и ни о какой папке `src` не знает.

Создать в корне:

```js
const path = require('path');

module.exports = {
  config: path.resolve('src', 'db', 'config', 'config.cjs'),
  'models-path': path.resolve('src', 'db', 'models'),
  'migrations-path': path.resolve('src', 'db', 'migrations'),
  'seeders-path': path.resolve('src', 'db', 'seeders'),
};
```

Внутри именно `require`/`module.exports`: `.sequelizerc` тоже читается через `require`.

Проверка — в выводе любой команды CLI должна появиться строка
`Loaded configuration file "src/db/config/config.cjs"`:

```bash
npx sequelize-cli db:migrate:status
```

---

## 9. Создание базы и миграция

```bash
npx sequelize-cli db:create
npx sequelize-cli migration:generate --name create-users
```

CLI создаст файл в `src/db/migrations/` с расширением `.js` — переименовать в `.cjs` (причина та же,
что в шаге 7) и описать таблицу:

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

Запуск:

```bash
npx sequelize-cli db:migrate
```

Полезные команды:

```bash
npx sequelize-cli db:migrate:status     # статус миграций
npx sequelize-cli db:migrate:undo       # откатить последнюю
npx sequelize-cli db:migrate:undo:all   # откатить все
```

---

## 10. Модель с хэшированием пароля (`src/db/models/user.ts`)

```ts
import bcrypt from 'bcryptjs';
import {
  DataTypes,
  Model,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
} from 'sequelize';
import sequelize from '../connection.js';

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

> **Мини-док: `declare` перед полем класса — почему без него ломается**
>
> Здесь `declare` значит другое, чем в `.d.ts`: «поле такого типа существует, но **не создавай под
> него свойство в конструкторе**».
>
> Это не украшательство. Sequelize определяет свойства модели через геттеры на прототипе. Если TS
> сгенерирует обычное объявление поля, оно при создании объекта запишет `undefined` поверх геттера, и
> модель перестанет читать данные. `declare` даёт типы, не порождая кода.

> **Мини-док: `InferAttributes` и `CreationOptional`**
>
> `Model<InferAttributes<User>, InferCreationAttributes<User>>` — два параметра-типа: какие поля есть
> у записи из БД и какие нужно передать при создании. `InferAttributes` собирает их автоматически из
> полей самого класса, поэтому список полей пишется один раз.
>
> `CreationOptional<number>` помечает поле как необязательное **при создании**: `id` проставит
> автоинкремент, `createdAt`/`updatedAt` — сам Sequelize. Благодаря этому
> `User.create({ name, email, password })` проходит проверку типов, хотя в записи полей больше.

> **Мини-док: `import { type X }` — импорт только типа**
>
> Ключевое слово `type` внутри фигурных скобок означает, что импортируется исключительно тип, и из
> скомпилированного JS этот импорт исчезнет. Нужно, когда пакет типы и рантайм-значения экспортирует
> вперемешку: `DataTypes` и `Model` — настоящие объекты, `InferAttributes` — только тип.
> Если не пометить, сборщик попытается импортировать несуществующее значение.

**Хук `beforeSave`** хэширует пароль перед каждой записью, но только если поле менялось —
иначе при любом обновлении пользователя хэш хэшировался бы повторно. Пароль в открытом виде
не попадает в базу ни при регистрации, ни при смене.

---

## 11. Выпуск и проверка токенов (`src/utils/jwt.ts`)

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

> **Мини-док: `as` — приведение типа, и когда оно уместно**
>
> `as` не проверяет и не преобразует значение, а лишь говорит компилятору «считай, что тип такой».
> Ошибиться здесь легко, поэтому по умолчанию `as` — плохой знак. Два места, где он оправдан:
>
> `as SignOptions['expiresIn']` — библиотека ждёт не любую строку, а формат вроде `'7d'` или `'15m'`.
> Из `.env` приходит просто `string`, доказать формат компилятору невозможно. Запись
> `SignOptions['expiresIn']` — **indexed access type**, «тип поля `expiresIn` внутри типа
> `SignOptions`»: не дублируем определение, а ссылаемся на него.
>
> `jwt.verify(...) as TokenPayload` — функция возвращает `string | JwtPayload`, потому что в токене
> может лежать что угодно. Мы знаем, что кладём туда, поэтому сужаем тип. Плата за это — если
> структура payload изменится, компилятор не предупредит.

> **Мини-док: `interface` против `type`**
>
> Для описания формы объекта — `interface`: он читается привычнее и поддерживает слияние деклараций
> (шаг 5). `type` берут для того, чего interface не умеет: объединений (`'a' | 'b'`), кортежей,
> вычисляемых типов.

---

## 12. Middleware проверки токена (`src/middleware/auth.ts`)

```ts
import type { NextFunction, Request, Response } from 'express';
import { verifyToken, type TokenPayload } from '../utils/jwt.js';

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

> **Мини-док: расширение чужого типа — тот же приём, что в шаге 5**
>
> В JS мы просто писали `req.user = ...` и никто не возражал. В TS у `Request` нет поля `user`, и
> компилятор это заметит.
>
> Решение — то же слияние деклараций: дописываем поле в интерфейс `Request` из namespace `Express`.
> Поле помечено `?`, потому что на роутах без middleware его действительно нет — и компилятор будет
> требовать проверки перед использованием. Отсюда `req.user!.id` в шаге 13: там `auth` отработал
> гарантированно, `!` снимает проверку.
>
> Достаточно объявить это **один раз в любом файле программы** — расширение видно везде.
>
> **Мини-док: `import type { ... }`** — то же, что `type` в скобках из шага 10, но для всего импорта
> сразу. `NextFunction`, `Request`, `Response` — чистые типы, в рантайме их не существует.

**Про `header?.startsWith`** — optional chaining: если `authorization` отсутствует (тип
`string | undefined`), выражение вернёт `undefined`, а не упадёт. В TS такая проверка ещё и сужает
тип для строк ниже.

---

## 13. Роуты регистрации и логина (`src/routes/auth.ts`)

```ts
import { Router, type Request, type Response } from 'express';
import User from '../db/models/user.js';
import { auth } from '../middleware/auth.js';
import { signToken } from '../utils/jwt.js';

const router = Router();

interface RegisterBody {
  name?: string;
  email?: string;
  password?: string;
}

interface LoginBody {
  email?: string;
  password?: string;
}

// Регистрация
router.post('/register', async (req: Request<unknown, unknown, RegisterBody>, res: Response) => {
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
});

// Логин
router.post('/login', async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'email и password обязательны' });
  }

  const user = await User.findOne({ where: { email } });
  // одинаковый ответ на «нет юзера» и «неверный пароль» — чтобы не выдавать наличие email
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Неверный email или пароль' });
  }

  const { password: _, ...safe } = user.toJSON();

  res.json({ user: safe, token: signToken({ id: user.id, email: user.email }) });
});

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

> **Мини-док: `Request<unknown, unknown, RegisterBody>` — типизация тела запроса**
>
> `Request` принимает параметры-типы в фиксированном порядке: `<Params, ResBody, ReqBody, Query>`.
> Нас интересует третий, поэтому первые два заполняем `unknown` — «значение есть, но про его тип
> ничего не утверждаем». `unknown` безопаснее `any`: с ним нельзя работать, не сузив тип, тогда как
> `any` отключает проверки полностью.
>
> Все поля в `RegisterBody` помечены `?` намеренно. Тело запроса приходит извне, и клиент может
> прислать что угодно или ничего. Тип обязан отражать реальность, а не желаемое, — поэтому поля
> необязательные, а проверка `if (!name || !email || !password)` не формальность: именно она сужает
> типы до `string` для кода ниже. Это тот случай, когда типы и валидация делают одну работу.

**Про безопасность в этих роутах:**

- `const { password: _, ...safe } = user.toJSON()` — деструктуризация с переименованием: вынимаем
  хэш пароля в переменную `_` и отправляем клиенту остаток. В `/me` то же достигается через
  `attributes: { exclude: ['password'] }` — там пароль не выбирается из базы вовсе.
- На несуществующий email и на неверный пароль ответ одинаковый. Иначе перебором по эндпоинту логина
  можно узнать, кто зарегистрирован в системе.

---

## 14. Сервер (`src/server.ts`)

```ts
import 'dotenv/config';
import express from 'express';
import sequelize from './db/connection.js';
import authRouter from './routes/auth.js';

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRouter);

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', (error as Error).message);
  }
});
```

> **Мини-док: почему `import ... from './db/connection.js'`, а файл при этом `.ts`**
>
> Самое неожиданное место для новичка: импортируем **`.js`, хотя на диске лежит `.ts`**.
>
> Причина в том, что `tsc` не переписывает пути импортов. Что напишешь — то и окажется в `dist`.
> А в ES-модулях Node расширение обязательно: `import './connection'` в рантайме упадёт с
> `ERR_MODULE_NOT_FOUND`. Значит в исходнике должно стоять то имя, которое будет верным **после**
> сборки, то есть `.js`. TypeScript про это правило знает и сам сопоставит `./connection.js` с
> файлом `connection.ts`.
>
> Правило действует при `"type": "module"` и `"module": "node18"`. В CommonJS-проекте расширения не
> нужны — если видел проект на TS без них, скорее всего там `"type": "commonjs"`.

> **Мини-док: `(error as Error).message`**
>
> В `catch` TypeScript даёт переменной тип `unknown`: бросить в JS можно что угодно, не только
> `Error`. Обратиться к `.message` без сужения типа нельзя. Здесь мы знаем источник ошибки и
> используем `as`; в общем случае надёжнее `error instanceof Error ? error.message : String(error)` —
> это настоящая проверка, а не обещание.

**`_req`** — подчёркивание помечает намеренно неиспользуемый параметр. Договорённость для человека
и для линтеров.

---

## 15. Скрипты запуска (`package.json`)

```json
{
  "main": "dist/server.js",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc -p tsconfig.json",
    "start": "node dist/server.js",
    "typecheck": "tsc --noEmit -p tsconfig.json",
    "db:create": "sequelize-cli db:create",
    "db:migrate": "sequelize-cli db:migrate",
    "db:migrate:status": "sequelize-cli db:migrate:status",
    "db:migrate:undo": "sequelize-cli db:migrate:undo",
    "db:migrate:undo:all": "sequelize-cli db:migrate:undo:all"
  }
}
```

> **Мини-док: `tsx` против `tsc`, и почему нужны оба**
>
> **`tsx`** запускает `.ts` напрямую: на лету выкидывает типы и исполняет получившийся JS.
> Быстро, с `watch` — то, что нужно для разработки. Но типы он **не проверяет**, а просто стирает:
> код с ошибками типов у него запустится.
>
> **`tsc`** проверяет типы и собирает `dist` для продакшена. Отсюда отдельный `typecheck` с
> `--noEmit` — «только проверь, ничего не пиши». Гоняй его перед коммитом, иначе ошибки типов
> накопятся незамеченными.

---

## 16. Запуск и проверка

```bash
npm run db:create
npm run db:migrate
npm run typecheck
npm run dev
```

Регистрация:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Yury","email":"yury@example.com","password":"secret123"}'
```

Ответ — созданный пользователь без пароля и токен:

```json
{
  "user": { "id": 1, "name": "Yury", "email": "yury@example.com", "createdAt": "...", "updatedAt": "..." },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Логин:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"yury@example.com","password":"secret123"}'
```

Текущий пользователь по токену:

```bash
curl http://localhost:3000/auth/me \
  -H "Authorization: Bearer ВСТАВЬ_ТОКЕН"
```

Ожидаемые коды ошибок:

| Запрос | Код | Ответ |
|---|---|---|
| Регистрация без обязательного поля | 400 | `name, email и password обязательны` |
| Регистрация на занятый email | 409 | `Пользователь с таким email уже существует` |
| Логин с неверным паролем | 401 | `Неверный email или пароль` |
| `/me` без заголовка `Authorization` | 401 | `Нужен заголовок Authorization: Bearer <token>` |
| `/me` с испорченным токеном | 401 | `Невалидный или просроченный токен` |

Проверить, что пароль лежит в базе хэшем:

```sql
SELECT email, password FROM users;
-- $2b$10$Zs58LOEuWOKFRM0Y/7Wy0eo...
```

---

## 17. Итоговая структура

```
26.08.12/
├── .env                     # реальные значения, в git не идёт
├── .env.example             # шаблон, коммитится
├── .sequelizerc             # где CLI искать конфиг, модели, миграции
├── tsconfig.json
├── package.json
└── src/
    ├── server.ts            # точка входа
    ├── types/
    │   └── env.d.ts         # типы process.env
    ├── db/
    │   ├── connection.ts    # инстанс Sequelize
    │   ├── config/
    │   │   └── config.cjs   # конфиг для CLI (CommonJS)
    │   ├── migrations/
    │   │   └── *.cjs        # миграции (CommonJS)
    │   └── models/
    │       └── user.ts
    ├── middleware/
    │   └── auth.ts          # проверка JWT
    ├── routes/
    │   └── auth.ts          # /register, /login, /me
    └── utils/
        └── jwt.ts           # выпуск и проверка токенов
```

---

## Шпаргалка по TS-конструкциям из этого проекта

| Конструкция | Где | Что делает |
|---|---|---|
| `declare global { ... }` | `types/env.d.ts`, `middleware/auth.ts` | пробивает границу модуля, дополняет глобальную область |
| `namespace NodeJS` / `namespace Express` | там же | группировка чужих типов; обращение к ним по полному имени |
| declaration merging | там же | повторное объявление `interface` дополняет существующий, а не заменяет |
| `.d.ts` | `types/env.d.ts` | файл только с объявлениями, в сборку не попадает |
| `declare id: ...` в классе | `models/user.ts` | тип поля без генерации свойства — обязательно для Sequelize |
| `InferAttributes` / `CreationOptional` | `models/user.ts` | вывод атрибутов модели из полей класса |
| `import { type X }` / `import type` | почти везде | импорт только типа, из JS исчезает |
| `as` | `utils/jwt.ts`, `server.ts` | приведение типа без проверки — применять точечно |
| `SignOptions['expiresIn']` | `utils/jwt.ts` | indexed access type — ссылка на тип поля |
| `unknown` | `routes/auth.ts` | «тип неизвестен», безопасная замена `any` |
| `!` (non-null assertion) | `routes/auth.ts` | «здесь точно не `undefined`» — только когда это гарантировано кодом |
| `?.` (optional chaining) | `middleware/auth.ts` | безопасное обращение + сужение типа |
