require('dotenv').config();

const config = {
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME || 'database_development',
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT || 3306),
  dialect: 'mysql',
};

module.exports = {
  development: config,
  test: { ...config, database: process.env.DB_TEST_NAME || 'mini_project_test' },
  production: { ...config, database: process.env.DB_PROD_NAME || 'mini_project_prod' },
};
