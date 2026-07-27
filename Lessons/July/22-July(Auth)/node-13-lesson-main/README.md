# Node lesson 13: Express, Sequelize и MySQL

Небольшой учебный проект на Node.js. В нём Express запускает HTTP-сервер, Sequelize подключается к MySQL, а модели описывают пользователей и посты.

## Стек

- Node.js и ES-модули (`"type": "module"`)
- Express
- Sequelize 6
- MySQL через `mysql2`
- Sequelize CLI для миграций
- `dotenv` для переменных окружения

## Структура проекта

```text
.
├── config/
│   ├── config.js       # настройки БД для приложения
│   ├── config.json     # настройки для Sequelize CLI
│   └── db.js           # экземпляр Sequelize
├── migrations/         # изменения структуры базы данных
├── models/
│   ├── User.js         # модель users
│   ├── Post.js         # модель posts
│   └── index.js        # связи между моделями
├── routes/
│   ├── users.js        # endpoint-ы пользователей и их постов
│   └── posts.js        # endpoint-ы постов
├── server.js           # настройка Express и запуск сервера
├── .env.example        # пример переменных окружения
└── package.json
```

## Что понадобится

- Node.js 18 или новее
- работающий сервер MySQL
- созданная база данных

Например, базу можно создать так:

```sql
CREATE DATABASE node_13_lesson;
```

Базу данных создаём вручную до запуска миграций. Миграции создают таблицы внутри уже существующей базы, но не создают саму базу.

## Установка

```bash
npm install
cp .env.example .env
cp config/config.example.json config/config.json
```

Заполняем `.env` своими настройками:

```env
PORT=3333
DB_NAME=node_13_lesson
DB_USER=root
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
NODE_ENV=development
```

После копирования указываем пароль MySQL в локальном `config/config.json` в секции `development`:

```json
{
  "development": {
    "username": "root",
    "password": "пароль_mysql",
    "database": "node_13_lesson",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

`config.js` не переименовываем: он используется приложением. Файл `config/config.json` создаём из `config/config.example.json` для Sequelize CLI. Пароль в `.env` используется приложением, а пароль в `config/config.json` — CLI при запуске миграций. Настройки в этих файлах должны соответствовать друг другу.

## Миграции

Перед миграциями вручную создаём базу `node_13_lesson` и указываем пароль в `.env` и локальном `config/config.json`.

Миграции создают таблицы в базе данных. В проекте они выполняются в таком порядке:

1. `20260512074229-create-users.js` создаёт таблицу `users`.
2. `20260512074239-create-posts.js` создаёт таблицу `posts` и внешний ключ `posts.userId -> users.id`.

Запуск миграций:

```bash
npx sequelize-cli db:migrate --config config/config.json
```

Важно: миграции не запускаются автоматически из `server.js`. Сервер только подключает роутеры и проверяет подключение к базе через `sequelize.authenticate()`.

Откат последней миграции (просто пример, выполнять не нужно):

```bash
npx sequelize-cli db:migrate:undo --config config/config.json
```

Откат всех миграций (просто пример, выполнять не нужно):

```bash
npx sequelize-cli db:migrate:undo:all --config config/config.json
```

Команды CLI используют `config/config.json`. Если пароль или имя базы отличаются от значений в этом файле, перед миграциями обновляем соответствующую секцию `development`.

## Запуск приложения

Обычный запуск:

```bash
npm start
```

Запуск в режиме разработки с автоматическим перезапуском:

```bash
npm run dev
```

После запуска сервер доступен по адресу [http://localhost:3333](http://localhost:3333). Для запросов с JSON передаём заголовок `Content-Type: application/json`.

## Endpoint-ы

Все учебные операции из файлов `routes/users.js` и `routes/posts.js` вызываются через HTTP:

| Метод и путь              | Что делает                             |
| ------------------------- | -------------------------------------- |
| `GET /`                   | Проверяем, что сервер запущен          |
| `POST /users`             | Создаём пользователя                   |
| `POST /posts`             | Создаём пост для пользователя          |
| `GET /users`              | Получаем всех пользователей            |
| `GET /users/email/:email` | Ищем пользователя по email             |
| `GET /users/:userId`      | Получаем пользователя вместе с постами |
| `PATCH /users/:email`     | Обновляем имя пользователя             |

Примеры запросов выполняем из другого терминала:

```bash
# Создаём пользователя
curl -X POST http://localhost:3333/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Astemir","email":"astemir@gmail.com"}'

# Создаём пост для пользователя с id 1
curl -X POST http://localhost:3333/posts \
  -H 'Content-Type: application/json' \
  -d '{"userId":1,"title":"My first post","content":"Post content"}'

# Получаем всех пользователей
curl http://localhost:3333/users

# Ищем пользователя по email
curl http://localhost:3333/users/email/astemir@gmail.com

# Получаем пользователя вместе с постами
curl http://localhost:3333/users/1

# Обновляем имя пользователя
curl -X PATCH http://localhost:3333/users/astemir@gmail.com \
  -H 'Content-Type: application/json' \
  -d '{"name":"Artem"}'
```

## Модели и связи

`User` соответствует таблице `users`, а `Post` — таблице `posts`.

Связь описана в `models/index.js`:

```js
User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });
```

Один пользователь может иметь много постов. Пост принадлежит одному пользователю.

## Роутеры и функции Sequelize

В `server.js` находится только общая настройка приложения. Маршруты разделены по сущностям:

- `routes/users.js` — создание, поиск и обновление пользователей, а также получение пользователя вместе с постами;
- `routes/posts.js` — создание поста для существующего пользователя.

Внутри роутеров выполняются операции Sequelize:

- `User.create()` — создаёт пользователя;
- `User.findOne()` — ищет пользователя по email или id;
- `User.findAll()` — получает всех пользователей;
- `User.update()` — изменяет имя пользователя;
- `Post.create()` — создаёт пост для существующего пользователя;
- `include` — загружает посты пользователя вместе с его данными.

Отдельно вызывать или комментировать функции не требуется: для проверки отправляем HTTP-запросы из раздела выше. Это предотвращает случайное повторное создание данных при каждом запуске сервера.

## Проверка проблем

Если сервер сообщает об ошибке подключения, проверяем:

1. запущен ли MySQL;
2. существует ли база из `DB_NAME`;
3. правильные ли `DB_USER`, `DB_PASSWORD` и `DB_HOST` в `.env`;
4. совпадают ли настройки CLI в `config/config.json` перед запуском миграций.

Если таблицы ещё не созданы, сначала выполняем миграции, а затем запускаем сервер.
