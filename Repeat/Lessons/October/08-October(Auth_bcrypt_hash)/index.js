import express from 'express';
import 'dotenv/config';
import bcrypt from 'bcrypt';

const PORT = process.env.PORT || 3000;

const users = [];

const app = express();

app.use(express.json());

app.get('/', (_req, res) => {
    res.send('Home page');
});

app.post('/register', async (req, res, _next) => {
    try {
        const { username, password } = req.body ?? {};

        if (!username || !password) {
            return res.status(400).json({ message: 'username и password  обязательны' });
        }

        // На практике не даем зарегистрировать пользователя с таким же email, потому что email - это уникальное значение
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
            return res.status(409).json({ message: 'Пользователь с таким именем уже существует' })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = {
            id: users.length + 1,
            username,
            password: hashedPassword,
        }

        users.push(newUser);

        console.log('Текущие пользователи:', users);


        res.status(201).json({
            message: 'Пользователь успешно зарегистрирован',
            user: { id: newUser.id, username: newUser.username }
        });
    } catch (error) {
        console.error('Ошибка при регистрации:', error.message);
        res.status(500).json({ message: 'Ошибка сервера при регистрации' });
    }
});

app.post('/login', async (req, res, _next) => {
    try {
        const { username, password } = req.body ?? {};

        if (!username || !password) {
            res.status(400).json({
                message: 'username и password обязательны для заполнения',
            });
        }

        const user = users.find((user) => user.username === username);

        if (!user) {
            res.status(401).json({
                message: 'Неверный логин или пароль',
            });
        }

        const isValidPassword = await bcrypt.compare(password, user.password);

        if (!isValidPassword) {
            res.status(401).json({
                message: 'Неверный логин или пароль',
            });
        }

        res.json({
            message: 'Вход выполнен успешно',
            user: { id: user.id, username: user.username },
        });
    } catch (error) {
        console.error('Ошибка при входе', error.message);
        res.status(500).json({
            message: 'Ошибка сервера при входе',
        });
    }

});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});