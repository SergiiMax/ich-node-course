// 1.Создайте новый проект Node.js и установите Express.js, если вы еще этого не сделали.
// 1.Создайте файл `index.js` и добавьте в него следующий код.
// 1.Настройте сервер для обработки данных из тела запроса с помощью middleware.
// 1.Создайте маршруты для обработки GET и POST запросов:
// ○Маршрут для получения пользователя по ID с использованием параметров маршрута и запроса.
// ○Маршрут для получения текстового ответа.
// ○Маршрут для получения JSON-ответа.
// ○Маршрут для отправки данных через POST-запрос, который возвращает полученные данные.
// // Запустите сервер и протестируйте маршруты в браузере или с помощью инструментов вроде

import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userName = req.query.name;

    res.send(`User ID: ${userId}. User name: ${userName || 'not name'}`);
})

app.get('/text', (_req, res) => {
    res.send('Hello, this is a text response');
});

app.get('/json', (_req, res) => {
    res.json({
        message: 'Hello, this is a json response',
        timestamp: new Date().toISOString(),
    });
})

app.post('/submit', (req, res) => {
    const { username, email } = req.body
    if(!username || !email) {
        return res.status(400).json({ error: "Filds 'username' and 'email' are required" })
    }
    res.status(201).json({ 
        message: 'Data recieved successfully',
        data: { username, email }
    })
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});






