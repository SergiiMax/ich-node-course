import { Sequelize } from "sequelize";
import configData from './config.js';
import 'dotenv/config';

// Определяем текущее окружение
const env = process.env.NODE_ENV || 'development';

const config = configData[env];

// Создаем экземпляр Sequelize, то есть экземпляр подключения к БД
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: config.dialect,
        logging: false // не печатай каждый SQL-запрос в консоль автоматически. Сможем прописать  SQL-запрос явно с помощью console.log сами, в логике.
    }
)

export default sequelize;