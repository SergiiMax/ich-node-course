import express from 'express';
import 'dotenv/config';
import sequelize from './config/db.js';
import User from './models/user.js';


const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get('/', (_req, res) => {
    res.send('Home page');
});

app.post('/users', async (req, res, next) => {
    try {
        const { name, email } = req.body;

        const newUser = await User.create({ name, email });
        console.log('User created: ', newUser.toJSON());
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

app.get('/users:id', async (req, res, next) => {
    const userId = req.params.id
    const user = await User.findByPk(userId)
    if (!user) {
        console.log(`User with id:${userId} not found`);
        return next(new HttpErrot)
    }
})

app.use((error, _req, res, _next) => {
    // error.name ? status

    console.log('[ERROR]: ', error.message);
    res.status(500).json({
        error: 'Внутренняя ошибка сервера',
    })
});

app.listen(PORT, async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to the database has been successfully');
        console.log(`Server running at http://localhost:${PORT}`);
    } catch (error) {
        console.error('Unable to connect to the database', error.message);
    }
});