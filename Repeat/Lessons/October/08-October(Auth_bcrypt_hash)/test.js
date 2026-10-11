import axios from "axios";
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const BASE_URL = `http://localhost:${PORT}`;


async function registerUser(user) {
    try {
        const response = await axios.post(`${BASE_URL}/register`, user);
        console.log('Результат регистрации пользователя:', response.data);
    } catch (error) {
        console.error('Ошибка при регистрации пользователя:', error.data);
    }

}

async function loginUser(user) {
    try {
        const response = await axios.post(`${BASE_URL}/login`, user);
        console.log('Результат аутентификации пользователя:', response.data);
    } catch (error) {
        console.error('Ошибка при аутентификации пользователя:', error.data);
    }
}

async function start() {
    await registerUser({
        username: 'Alexander',
        password: 'на горшке сидел король',
    });

    await loginUser({
        username: 'Alexander',
        password: 'на горшке сидел король',
    });
}

start();