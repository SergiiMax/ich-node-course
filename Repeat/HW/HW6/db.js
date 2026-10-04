import mysql from "mysql2/promise";
import dotenv from "dotenv/config";

export const dbConfig = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
};

const pool = mysql.createPool({
  ...dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function checkConnection() {
  const connection = await pool.getConnection();
  console.log(`Connected to MySQL database "${dbConfig.database}"`);
  connection.release();
}

export default pool;
