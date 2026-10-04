// 1.Импортируйте модуль `http`.
// 1.Создайте сервер с использованием метода `http.createServer()`.
// 1.В функции обратного вызова проверьте URL запроса, используя свойство `req.url`.
// 1.В зависимости от значения URL, отправьте различный текст в ответе.
// ○Если URL равен `/`, отправьте текст "Главная страница".
// ○Если URL равен `/about`, отправьте текст "О нас".
// ○Если URL равен `/contact`, отправьте текст "Контакты".
// ○Для всех остальных URL отправьте текст "Страница не найдена" и установите статус ответа `404`.
// 1.Установите заголовок ответа `Content-Type` в `text/plain` для всех ответов.
// 1.Настройте сервер на прослушивание определенного порта, например, `3000`.
// 1.Добавьте сообщение в консоль, которое будет выводиться при успешном запуске сервера.


import http from 'http';
import dotenv from 'dotenv';

const PORT = process.env.PORT || 3000;


dotenv.config();

const server = http.createServer((req, res) => {
    console.log(req.url);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf8');
    if (req.url === '/') {
        res.end('Главная страница');
    } else if (req.url === '/about') {
        res.end('О нас');
    } else if (req.url === '/contacts') {
        res.end('Контакты');
    } else {
        res.statusCode = 404;
        res.end('Страница не найдена');
    }
});


server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});