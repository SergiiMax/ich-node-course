import 'dotenv/config';
import { MongoClient } from 'mongodb';

let client;
let dbConnection;

export async function connectToDatabase() {
    const url = process.env.MONGO_URL;

    if (!url) {
        throw new Error("'MONGO_URL' is not defined in .env");
    }

    // Создаем клиента для подключения к БД
    client = new MongoClient(url);

    await client.connect(); // Подключение к БД

    // client.db() возвращает нам экземпляр подключения к БД.
    dbConnection = client.db();

    console.log(`Connected successfully to MongoDB (db: ${dbConnection.databaseName})`);
}

// Возвращает активное подключение к БД
export function getDb() {
    if (!dbConnection) {
        throw new Error('Database not connected');
    }

    return dbConnection;
}

// Корректное закрытие подключение
export async function closeDatabase() {
    if(client) {
        await client.close();
        console.log('MongoDB connection closed');
    }
}