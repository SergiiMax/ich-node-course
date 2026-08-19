# Balance App — учёт баланса на TypeScript + MongoDB

Маленькое приложение с тремя маршрутами: посмотреть баланс, пополнить, потратить.
Баланс хранится в базе MongoDB, поэтому не пропадает после перезапуска сервера.

## Что получится в итоге

| Метод | Маршрут            | Что делает         |
|-------|--------------------|--------------------|
| GET   | `/balance`         | показать баланс    |
| POST  | `/balance/income`  | пополнить счёт     |
| POST  | `/balance/expense` | списать деньги     |

---

# Пошаговая инструкция

## Шаг 1. Создаём проект

```bash
mkdir balance-app
cd balance-app
npm init -y
```

`npm init -y` создаёт файл `package.json` — это «паспорт» проекта: в нём
записаны название, зависимости и команды запуска.

## Шаг 2. Устанавливаем пакеты

```bash
npm i express mongoose dotenv
```

```bash
npm i -D typescript @types/express @types/node tsx
```

Что мы поставили:

- **express** — создаёт сервер и обрабатывает маршруты.
- **mongoose** — библиотека для работы с MongoDB.
- **dotenv** — читает настройки из файла `.env`.
- **typescript** — превращает наш TS-код в обычный JS.
- **@types/express**, **@types/node** — типы для Express и Node. Без них TypeScript
  не знает, что такое `req`, `res` или `process.env`.
- **tsx** — запускает `.ts` файлы сразу, без ручной компиляции.

Флаг `-D` означает «нужно только разработчику». На готовом сервере эти пакеты не нужны.

## Шаг 3. Настраиваем TypeScript

Создайте файл `tsconfig.json` в корне проекта:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "src",
    "outDir": "dist",
    "types": ["node"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Главное здесь:

- `rootDir: "src"` — исходный код лежит в папке `src`.
- `outDir: "dist"` — готовый JS появится в папке `dist`.
- `strict: true` — строгий режим. TypeScript будет ругаться на непонятные типы.
  Именно ради этого мы и берём TS.

## Шаг 4. Включаем модули и добавляем команды

Откройте `package.json` и добавьте строку `"type": "module"` и блок `scripts`:

```json
{
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js"
  }
}
```

- `npm run dev` — запуск в разработке, сервер сам перезапускается после правок.
- `npm run build` — собрать проект в папку `dist`.
- `npm start` — запустить собранный проект.

> **Важное правило про импорты.** Из-за `"type": "module"` и `NodeNext` во всех
> импортах внутри проекта пишем расширение **`.js`**, даже если файл называется
> `.ts`:
>
> ```ts
> import { connectDB } from './config/db.js';   // файл на диске — db.ts
> ```
>
> Так работает Node: он ищет уже скомпилированный файл. Если написать без
> расширения — при запуске будет ошибка `ERR_MODULE_NOT_FOUND`.

## Шаг 5. Файл с настройками `.env`

Создайте в корне файл `.env`:

```
MONGO_URI=mongodb://127.0.0.1:27017/balance-app
PORT=3000
```

`MONGO_URI` — адрес базы данных. Последняя часть (`balance-app`) — название базы,
она создастся сама при первой записи.

Если вы используете **MongoDB Atlas** (база в облаке), строка будет другой —
её нужно скопировать в личном кабинете Atlas, кнопка *Connect → Drivers*:

```
MONGO_URI=mongodb+srv://логин:пароль@cluster0.xxxxx.mongodb.net/balance-app
```

Создайте файл `.gitignore`, чтобы пароли и лишние папки не попали в git:

```
node_modules
dist
.env
```

> `.env` не выкладывают в git — там пароли. Вместо него в проект кладут
> `.env.example` с теми же ключами, но без реальных значений.

## Шаг 6. Подключаемся к базе — `src/config/db.ts`

```ts
import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB Connected!');
  } catch (e) {
    console.error((e as Error).message);
    throw e;
  }
};
```

Разберём, что тут происходит:

- `mongoose.connect()` открывает соединение с базой. Это долгая операция,
  поэтому `await`, а функция — `async`.
- `process.env.MONGO_URI` — значение из файла `.env`.
- **`as string`** — так мы говорим TypeScript: «поверь, тут точно строка».
  Дело в том, что `process.env` возвращает тип `string | undefined` (переменной
  может и не быть), а `mongoose.connect` принимает только `string`. Без `as string`
  будет ошибка компиляции.
- **`(e as Error)`** — в блоке `catch` переменная `e` имеет тип `unknown`,
  потому что бросить в JS можно что угодно. Чтобы прочитать `e.message`,
  мы уточняем тип.
- `throw e` — пробрасываем ошибку дальше, чтобы сервер не запустился с мёртвой базой.

## Шаг 7. Описываем модель — `src/models/Balance.ts`

```ts
import { Schema, model } from 'mongoose';

// Описываем, как выглядит наш документ в базе.
const balanceSchema = new Schema({
  amount: { type: Number, required: true, default: 0 },
});

export const Balance = model('Balance', balanceSchema);
```

- **Схема (Schema)** — описание полей документа. У нас одно поле `amount` (сумма):
  число, обязательное, по умолчанию `0`.
- **Модель (model)** — объект, через который мы работаем с базой: ищем, создаём,
  сохраняем. Название пишем с большой буквы и в единственном числе — `'Balance'`.
  Mongoose сам создаст коллекцию `balances` (во множественном числе).

Приятный бонус TypeScript: тип документа mongoose выводит из схемы сам.
Писать `interface` вручную не нужно — `balance.amount` уже известен как `number`.

## Шаг 8. Пишем маршруты — `src/routes/balance.routes.ts`

```ts
import { Router } from 'express';
import { Balance } from '../models/Balance.js';

export const router = Router();

// Находим документ с балансом. Если его ещё нет — создаём с нулём.
async function getBalanceDoc() {
  let balance = await Balance.findOne();
  if (!balance) {
    balance = await Balance.create({ amount: 0 });
  }
  return balance;
}

// Проверяем сумму, которую прислал пользователь.
function checkAmount(value: unknown): number {
  const amount = Number(value);
  if (!Number.isFinite(amount) || amount <= 0) {
    throw new Error('Поле "amount" должно быть числом больше нуля');
  }
  return amount;
}
```

Две вспомогательные функции сверху нужны, чтобы не повторять один и тот же код
в каждом маршруте.

- `getBalanceDoc()` — в базе у нас всего один документ с балансом. При первом
  запуске его нет, поэтому создаём с нулём.
- `checkAmount()` — принимает `unknown`, потому что из тела запроса может прийти
  что угодно: строка, `null`, объект. Мы превращаем это в число и проверяем.
  `Number.isFinite` отсекает `NaN` (например, если прислали `"abc"`).

Теперь сами маршруты:

```ts
// 1. Текущий баланс
router.get('/balance', async (req, res) => {
  const balance = await getBalanceDoc();
  res.json({ balance: balance.amount });
});

// 2. Пополнение
router.post('/balance/income', async (req, res) => {
  try {
    const amount = checkAmount(req.body.amount);

    const balance = await getBalanceDoc();
    balance.amount += amount;
    await balance.save();

    res.json({ balance: balance.amount });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
});

// 3. Расход
router.post('/balance/expense', async (req, res) => {
  try {
    const amount = checkAmount(req.body.amount);

    const balance = await getBalanceDoc();
    if (amount > balance.amount) {
      throw new Error(`Недостаточно средств. На счету ${balance.amount}`);
    }

    balance.amount -= amount;
    await balance.save();

    res.json({ balance: balance.amount });
  } catch (e) {
    res.status(400).json({ error: (e as Error).message });
  }
});
```

Логика одинаковая во всех трёх случаях:

1. Проверили сумму.
2. Достали документ из базы.
3. Изменили поле `amount`.
4. **`await balance.save()`** — сохранили изменения обратно в базу.
   Без этой строки баланс поменяется только в памяти и пропадёт.
5. Ответили клиенту.

`try/catch` ловит ошибку из `checkAmount` (и нашу ошибку про нехватку средств)
и возвращает понятный ответ со статусом **400** — «клиент прислал что-то не то».

## Шаг 9. Запускаем сервер — `src/server.ts`

```ts
import 'dotenv/config';
import express from 'express';
import { connectDB } from './config/db.js';
import { router } from './routes/balance.routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

// Сначала подключаемся к базе, потом запускаем сервер.
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
  });
});
```

- **`import 'dotenv/config'`** — обязательно самой первой строкой. Эта строка
  читает файл `.env` и кладёт значения в `process.env`. Если поставить её ниже,
  переменные не успеют загрузиться и `MONGO_URI` будет `undefined`.
- **`app.use(express.json())`** — учит Express читать JSON из тела запроса.
  Без него `req.body` будет `undefined`.
- **`connectDB().then(...)`** — сервер стартует только после подключения к базе.

## Шаг 10. Проверяем

Запустите MongoDB (локально или используйте Atlas), затем:

```bash
npm run dev
```

В другом окне терминала:

```bash
curl http://localhost:3000/balance
```

```bash
curl -X POST http://localhost:3000/balance/income -H "Content-Type: application/json" -d "{\"amount\": 1000}"
```

```bash
curl -X POST http://localhost:3000/balance/expense -H "Content-Type: application/json" -d "{\"amount\": 200}"
```

Ожидаемые ответы:

```json
{ "balance": 0 }
{ "balance": 1000 }
{ "balance": 800 }
```

Попробуйте потратить больше, чем есть:

```json
{ "error": "Недостаточно средств. На счету 800" }
```

Остановите сервер и запустите заново — баланс останется прежним. Это и значит,
что данные лежат в базе, а не в памяти.

---

## Итоговая структура проекта

```
balance-app/
├── src/
│   ├── config/
│   │   └── db.ts                  # подключение к MongoDB
│   ├── models/
│   │   └── Balance.ts             # модель документа
│   ├── routes/
│   │   └── balance.routes.ts      # три маршрута
│   └── server.ts                  # запуск приложения
├── .env                           # настройки (в git не попадает)
├── .gitignore
├── package.json
└── tsconfig.json
```

## Частые ошибки

| Ошибка | Причина |
|--------|---------|
| `ERR_MODULE_NOT_FOUND` | забыли `.js` в импорте |
| `MONGO_URI` is undefined | `import 'dotenv/config'` стоит не первой строкой |
| `req.body` is undefined | забыли `app.use(express.json())` |
| `ECONNREFUSED 127.0.0.1:27017` | не запущена MongoDB |
| Баланс не сохраняется | забыли `await balance.save()` |
