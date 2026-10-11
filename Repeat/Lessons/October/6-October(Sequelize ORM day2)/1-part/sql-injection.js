import mysql from 'mysql2/promise';
import { Sequelize, DataTypes } from 'sequelize';
import 'dotenv/config';

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'auth_app'
});

// 1. Уязвимый код. Пользовательский ввод интегрируется в sql-запрос напрямую
export async function findUserUnsafe(username) {
    const sql = `SELECT * FROM users WHERE username='${username}'`;
    console.log(sql);
    const [rows] = await pool.query(sql);
    return rows;
}

// console.log(await findUserUnsafe('Alex'));
// console.log(await findUserUnsafe("' OR '1'='1"));


// 2. Подготовленное выражение
export async function findUserSafe(username) {
    const sql = `SELECT * FROM users WHERE id=?`;
    console.log(sql);
    const [rows] = await pool.query(sql, [username]);
    return rows;
}

// console.log(await findUserSafe('Alex'));
console.log(await findUserSafe("2 OR 1=1"));