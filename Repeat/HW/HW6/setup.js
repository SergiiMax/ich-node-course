import pool from "./db.js";

const createProductTable = `
CREATE TABLE IF NOT EXISTS products (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL,
price DECIMAL(10, 2) NOT NULL
)
`;

async function setup() {
  try {
    await pool.query(createProductTable);
    console.log('Table "products" is ready');
  } catch (error) {
    console.error("Failed to create table: ", error.message);
  } finally {
    await pool.end();
  }
}

setup();
