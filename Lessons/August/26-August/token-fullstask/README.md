# Token fullstack demo

Express + Sequelize (MySQL) на бэке, React + Vite на фронте.
Авторизация сделана **на httpOnly куках** с парой токенов: короткий `access` + длинный `refresh`.

> Про токены отдельно и подробно: **[TOKENS.md](TOKENS.md)** — где хранить токены на фронте и бэке,
> зачем нужны httpOnly куки, что будет без них, и разбор вопросов с собеседований.

---

## Быстрый старт

### 1. База

Нужен MySQL на `127.0.0.1:3316` с базой `ts_mysql` (параметры — в `backend/.env`).

```bash
docker run --name ts-mysql -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=ts_mysql -e MYSQL_USER=app -e MYSQL_PASSWORD=app -p 3316:3306 -d mysql:8
```

### 2. Бэкенд

```bash
cd backend && npm install && npx sequelize-cli db:migrate && npm run dev
```

Поднимется на `http://localhost:3333`.

### 3. Фронтенд

```bash
cd frontend && npm install && npm run dev
```

Откроется на `http://localhost:5173`.

---

## Переменные окружения

`backend/.env` (шаблон — `backend/.env.example`):

| Переменная | Зачем |
|---|---|
| `PORT` | порт API (3333) |
| `NODE_ENV` | в `production` куки становятся `secure: true` и `sameSite: 'strict'` |
| `CORS_ORIGIN` | разрешённые origin фронта через запятую |
| `JWT_ACCESS_SECRET` | секрет для access-токена |
| `JWT_REFRESH_SECRET` | **отдельный** секрет для refresh-токена |
| `JWT_ACCESS_EXPIRES_IN` | время жизни access (по умолчанию `15m`) |
| `JWT_REFRESH_EXPIRES_IN` | время жизни refresh (по умолчанию `7d`) |

`frontend/.env`:

| Переменная | Зачем |
|---|---|
| `VITE_API_URL` | адрес API (`http://localhost:3333`) |

---

## API

| Метод | Путь | Auth | Что делает |
|---|---|---|---|
| `POST` | `/api/auth/register` | — | создаёт юзера, ставит куки `access_token` + `refresh_token` |
| `POST` | `/api/auth/login` | — | проверяет пароль, ставит те же куки |
| `GET` | `/api/auth/me` | access-кука | «кто я» — фронт не может прочитать httpOnly куку сам |
| `POST` | `/api/auth/refresh` | refresh-кука | выдаёт новую пару токенов |
| `POST` | `/api/auth/logout` | — | гасит обе куки |
| `GET` | `/api/posts` | — | список постов |
| `POST` | `/api/posts` | access-кука | создать пост |
| `GET` | `/api/posts/:id` | — | один пост |
| `DELETE` | `/api/posts/:id` | access-кука | удалить свой пост |

Токен **не возвращается в теле ответа** — он живёт только в куке.

---

## Ключевые места в коде

**Бэкенд**

- [backend/src/utils/cookies.ts](backend/src/utils/cookies.ts) — флаги кук (`httpOnly`, `secure`, `sameSite`, `path`, `maxAge`), установка и очистка.
- [backend/src/utils/jwt.ts](backend/src/utils/jwt.ts) — подпись/проверка access и refresh на **разных секретах**.
- [backend/src/middleware/auth.ts](backend/src/middleware/auth.ts) — читает токен из куки, `Bearer` оставлен как запасной вариант для Postman.
- [backend/src/controllers/auth.controller.ts](backend/src/controllers/auth.controller.ts) — register / login / me / refresh / logout.
- [backend/src/index.ts](backend/src/index.ts) — CORS с `credentials: true` и белым списком origin.

**Фронтенд**

- [frontend/src/api/client.ts](frontend/src/api/client.ts) — `fetch` с `credentials: 'include'` и автоматическим повтором запроса после `refresh`.
- [frontend/src/auth/AuthContext.tsx](frontend/src/auth/AuthContext.tsx) — сессия восстанавливается запросом `GET /me`, а не чтением localStorage.

---

## Как проверить, что куки действительно httpOnly

```bash
curl -i -X POST localhost:3333/api/auth/login -H 'Content-Type: application/json' -d '{"email":"y@a.com","password":"secret123"}'
```

В ответе будет `Set-Cookie: access_token=...; HttpOnly; SameSite=Lax`.
А в браузере в консоли `document.cookie` эту куку **не покажет** — в этом весь смысл.
