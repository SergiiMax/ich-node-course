// 1.Создайте файл `index.js`.
// 1.Откройте файл `package.json` и добавьте следующий фрагмент для использования модулей ECMAScript: "type": "module"
// 1.Импортируйте Express и создайте экземпляр приложения.
// 1.Настройте маршрут для обработки GET запросов к корневому маршруту (`/`), который будет возвращать строку "Hello, World!".
// 1.Настройте сервер на прослушивание порта 3000 и запустите его.
// 1.Откройте браузер и перейдите по адресу `http://localhost:3000`, чтобы увидеть сообщение "Hello, World!".

// ===============2 часть
// 1.Создайте новый проект Node.js и установите Express.js, если вы еще этого не сделали.
// 1.Создайте файл `index.js` и откройте его в текстовом редакторе.
// 1.Импортируйте Express и создайте экземпляр приложения.
// 1.Создайте следующие маршруты:
// ○Корневой маршрут (`/`), который возвращает строку "Welcome to my site!".
// ○Маршрут для получения списка продуктов (`/products`), который возвращает строку "List of products".
// 1.Откройте браузер и перейдите по адресу `http://localhost:3000` для проверки корневого маршрута и `http://localhost:3000/products` для проверки маршрута продуктов.

// ========
// ○Маршрут для получения конкретного пользователя по ID (`/users/:id`), который возвращает строку с ID пользователя.
// ○Маршрут для поиска (`/search`), который принимает параметр запроса `q` и возвращает строку с этим параметром.


import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.get('/', (_req, res) => {
    res.send('Welcome to my site!');
});

app.get('/products', (_req, res) => {
    res.send('List of products');
})


app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    if(!userId){
        return res.status(400).send('Query params id is required');
    }
    res.send(`user ID: ${userId}`);
});



app.get('/search', (req, res) => {
    const searchStr = req.query.q;
    if (!searchStr) {
        return res.status(400).send('Query parametr id is required');
    }
    res.send(`Search string: ${searchStr}`);
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});