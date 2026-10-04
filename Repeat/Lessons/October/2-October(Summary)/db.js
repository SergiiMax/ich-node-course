import mysql from 'mysql2/promise' // promise нужен, чтобы писать запросы, через async/await
import dotenv from 'dotenv';

dotenv.config();

export const dbConfig = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

// Создаем пул соединений.
/**
 * В отличии от одного соединения пул держит несколько готовых соединений и выдает их по запросу - это быстрее и надежнее.
 * Одновременно обрабатывается много запросов
 */

const pool = mysql.createPool({
    ...dbConfig,
    waitForConnections: true, // Если все соединения заняты, то запрос ждет в очереди и не падает
    connectionLimit: 10, // Максимум 10 соединений
    queueLimit: 0, // Очередь ожидания без ограничения
});


// Функция для проверки подключения при старте сервера
export async function checkConnection() {
    const connection = await pool.getConnection(); // Берем соединение из пула
    console.log(`Connected to MySQL database "${dbConfig.database}"`);
    connection.release(); // Обязательно возвращаем соединение обратно в пул
}

// checkConnection();

export default pool;