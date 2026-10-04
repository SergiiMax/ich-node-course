import http from 'http';
import dotenv from 'dotenv';
dotenv.config()

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    console.log('method:', req.method);
    console.log('url:', req.url);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf8');

    if (req.method === 'GET') {
        if (req.url === '/') {
            res.end('Добро пожаловать на главную страницу!');
        } else if (req.url === '/about') {
            res.end('Это страница о нас.');
        } else if (req.url === '/contact') {
            res.end('Это страница контактов.');
        } else {
            res.statusCode = 404;
            res.end('Страница не найдена');
        }
    } else if (req.method === 'POST') {
        if (req.url === '/submit') {
            res.end('Форма отправлена!');
        } else {
            res.statusCode = 404;
            res.end('Страница не найдена');
        }
    } else {
        res.statusCode = 405;
        res.end('Метод не разрешен');
    }
})

server.listen(PORT, () => {
    console.log(`Server running at http://localgost:${PORT}`);
    
})