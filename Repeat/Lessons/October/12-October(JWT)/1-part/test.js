import axios from "axios";
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const BASE_URL = `http://localhost:${PORT}`;


async function getProfileUser(token) {
    try {
        const response = await axios.get(`${BASE_URL}/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log('Результат получения профиля пользователя:', response.data);
    } catch (error) {
        console.error('Ошибка при получении профиля пользователя:', error.data);
    }

}

async function loginUser(user) {
    try {
        const response = await axios.post(`${BASE_URL}/login`, user);
        console.log('Результат аутентификации пользователя. JSON Web Token:', response.data);
        return response.data.token;
    } catch (error) {
        console.error('Ошибка при аутентификации пользователя:', error.data);
    }
}

async function start() {
    const token = await loginUser({
        email: 'user@example.com',
        password: 'password123',
    });

    await getProfileUser(token);
}

// await loginUser({
    //     email: 'user@example.com',
    //     password: 'password123',
    // });

start();  