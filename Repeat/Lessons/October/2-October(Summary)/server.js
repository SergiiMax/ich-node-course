// index.js
// Главный файл приложения: Express сервер и REST API для таблицы users.
// Запуск: npm start (или node index.js)

// Подключаем переменные окружения из файла .env.
// ВАЖНО: этот импорт должен стоять ПЕРВЫМ.
// В ES-модулях все import выполняются раньше остального кода файла.
// Если написать dotenv.config() ниже, то db.js успеет прочитать process.env
// до того, как туда попадут значения из .env, и подключится с пустым паролем.
// Запись import 'dotenv/config' загружает .env сразу, на этапе импорта.
import 'dotenv/config';

import express from 'express';
import pool, { checkConnection } from './db.js'; // Пул соединений с MySQL и функция проверки подключения

// Порт берём из .env, а если его там нет, используем 3000
const PORT = process.env.PORT || 3000;

// Создаём экземпляр приложения Express
const app = express();

// ===================== MIDDLEWARE =====================
// Middleware это функции, которые выполняются по очереди для каждого запроса,
// до того как он попадёт в обработчик маршрута.

// Разбирает тело запроса в формате JSON и кладёт результат в req.body
app.use(express.json());

// Разбирает данные HTML-форм (application/x-www-form-urlencoded).
// extended: true позволяет передавать вложенные объекты, например user[name]=Alex
app.use(express.urlencoded({ extended: true }));

// Простой логгер: выводит в консоль время, метод и адрес каждого запроса.
// Параметр _res начинается с подчёркивания: так принято обозначать параметр,
// который функция получает, но не использует.
// next() передаёт управление следующему middleware или маршруту.
// Если его не вызвать, запрос "зависнет" и клиент не получит ответ.
app.use((req, _res, next) => {
    console.log(`${new Date().toISOString()}: ${req.method} ${req.url}`);
    next();
});

// ===================== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ =====================

// Создаёт объект ошибки с HTTP-статусом.
// Такую ошибку передаём в next(error), и её обработает общий обработчик ошибок внизу файла.
function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

// Проверяет, что id является целым положительным числом.
// Например, '5' превратится в 5, а 'abc' или '-1' вернут null.
function parseId(value) {
    const id = Number(value);
    return Number.isInteger(id) && id > 0 ? id : null;
}

// Простейшая проверка формата email: есть символ @ и точка после него
function isValidEmail(email) {
    return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ===================== МАРШРУТЫ =====================

// GET /
// Главная страница, удобно проверять, что сервер запущен
app.get('/', (_req, res) => {
    res.send('Home page!');
});

// GET /users
// Получить всех пользователей или отфильтровать их по имени и/или email.
// Примеры запросов:
//   /users                          все пользователи
//   /users?name=ali                 у кого в имени есть "ali"
//   /users?email=gmail              у кого в email есть "gmail"
//   /users?name=ali&email=gmail     подходит хотя бы одно из условий
app.get('/users', async (req, res, next) => {
    try {
        // req.query содержит параметры из адреса после знака ?
        const { name, email } = req.query; // ?name=value&email=value

        let sql = 'SELECT * FROM users';
        const conditions = []; // Сюда собираем части условия WHERE
        const params = [];     // Сюда собираем значения для плейсхолдеров ?

        // Каждый фильтр добавляем, только если он передан.
        // Так работает и один параметр, и оба сразу.
        if (name) {
            conditions.push('name LIKE ?');
            params.push(`%${name}%`); // % означает "любые символы", то есть поиск по подстроке
        }

        if (email) {
            conditions.push('email LIKE ?');
            params.push(`%${email}%`);
        }

        // Если есть хотя бы одно условие, добавляем WHERE.
        // OR вернёт пользователей, которые подходят хотя бы под одно условие.
        // Если нужно, чтобы совпадали оба условия сразу, замените ' OR ' на ' AND '.
        if (conditions.length > 0) {
            sql += ' WHERE ' + conditions.join(' OR ');
        }

        sql += ' ORDER BY id'; // Сортируем по id, чтобы порядок всегда был одинаковым

        // Значения никогда не вставляем в SQL-строку напрямую.
        // Плейсхолдеры ? и массив params защищают от SQL-инъекций:
        // mysql2 сам экранирует значения перед отправкой в базу.
        // pool.query() возвращает массив [rows, fields] (нам нужны только строки)
        const [rows] = await pool.query(sql, params);

        res.json(rows); // Отправляем клиенту массив пользователей в формате JSON
    } catch (error) {
        next(error); // Любую ошибку передаём в общий обработчик ошибок
    }
});

// GET /users/:id
// Получить одного пользователя по id.
// :id это параметр маршрута, его значение доступно в req.params.id
// Пример: /users/1
app.get('/users/:id', async (req, res, next) => {
    try {
        const id = parseId(req.params.id);

        // Некорректный id, например /users/abc, сразу отклоняем со статусом 400
        if (!id) {
            throw createError(400, 'Invalid user ID');
        }

        const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);

        // Пустой массив означает, что пользователя с таким id нет
        if (rows.length === 0) {
            throw createError(404, 'User not found');
        }

        res.json(rows[0]); // Возвращаем один объект, а не массив
    } catch (error) {
        next(error);
    }
});

// POST /users
// Добавить нового пользователя.
// Тело запроса (JSON): { "name": "John", "email": "john@example.com" }
app.post('/users', async (req, res, next) => {
    try {
        const { name, email } = req.body; // Данные из тела запроса

        // Проверяем входные данные: клиенту доверять нельзя
        if (!name || typeof name !== 'string' || !name.trim()) {
            throw createError(400, 'Field "name" is required');
        }
        if (!isValidEmail(email)) {
            throw createError(400, 'Field "email" is required and must be a valid email');
        }

        const [result] = await pool.query(
            'INSERT INTO users (name, email) VALUES (?, ?)',
            [name.trim(), email.trim()] // trim() убирает лишние пробелы по краям
        );

        // result.insertId это id, который MySQL присвоил новой записи.
        // Статус 201 Created означает, что ресурс успешно создан.
        res.status(201).json({
            message: 'User added successfully',
            user: { id: result.insertId, name: name.trim(), email: email.trim() },
        });
    } catch (error) {
        // ER_DUP_ENTRY: нарушено ограничение UNIQUE, такой email уже есть в базе.
        // Статус 409 Conflict сообщает клиенту о конфликте данных.
        if (error.code === 'ER_DUP_ENTRY') {
            return next(createError(409, 'User with this email already exists'));
        }
        next(error);
    }
});

// PUT /users/:id
// Обновить данные пользователя.
// Тело запроса (JSON): { "name": "New name", "email": "new@example.com" }
app.put('/users/:id', async (req, res, next) => {
    try {
        const id = parseId(req.params.id);
        if (!id) {
            throw createError(400, 'Invalid user ID');
        }

        const { name, email } = req.body;
        if (!name || typeof name !== 'string' || !name.trim() || !isValidEmail(email)) {
            throw createError(400, 'Fields "name" and valid "email" are required');
        }

        const [result] = await pool.query(
            'UPDATE users SET name = ?, email = ? WHERE id = ?',
            [name.trim(), email.trim(), id]
        );

        // affectedRows показывает, сколько строк затронул запрос.
        // 0 означает, что пользователя с таким id нет.
        if (result.affectedRows === 0) {
            throw createError(404, 'User not found');
        }

        res.json({
            message: 'User updated successfully',
            user: { id, name: name.trim(), email: email.trim() },
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return next(createError(409, 'User with this email already exists'));
        }
        next(error);
    }
});

// DELETE /users/:id
// Удалить пользователя по id
app.delete('/users/:id', async (req, res, next) => {
    try {
        const id = parseId(req.params.id);
        if (!id) {
            throw createError(400, 'Invalid user ID');
        }

        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            throw createError(404, 'User not found');
        }

        // Статус 204 No Content: всё прошло успешно, но тело ответа пустое
        res.status(204).end();
    } catch (error) {
        next(error);
    }
});

// ===================== ОБРАБОТКА ОШИБОК =====================

// Обработчик несуществующих маршрутов (404).
// Срабатывает, если ни один маршрут выше не подошёл к запросу.
app.use((req, _res, next) => {
    next(createError(404, `Route ${req.method} ${req.url} not found`));
});

// Общий обработчик ошибок.
// Express отличает его от обычного middleware по ЧЕТЫРЁМ параметрам: (error, req, res, next).
// Даже если next не используется, он должен быть в списке параметров.
// Подключается ПОСЛЕДНИМ, после всех маршрутов.
app.use((error, _req, res, _next) => {
    const status = error.status || 500; // Если статус не задан, это внутренняя ошибка сервера

    // Ошибки 500 означают проблему на сервере, выводим полный стек для отладки
    if (status === 500) {
        console.error(error.stack);
    }

    res.status(status).json({
        // Подробности внутренних ошибок (например, текст ошибки SQL) клиенту не показываем
        message: status === 500 ? 'Internal Server Error' : error.message,
    });
});

// ===================== ЗАПУСК СЕРВЕРА =====================

// Сначала проверяем подключение к базе данных и только потом запускаем сервер.
// Если база недоступна, принимать запросы нет смысла.
async function start() {
    try {
        await checkConnection();

        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
        process.exit(1); // Завершаем процесс с кодом ошибки 1
    }
}

start();