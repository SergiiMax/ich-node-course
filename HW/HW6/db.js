import mysql from "mysql2";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Legend@28",
  database: "products_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: ", err.stack);
    return;
  }
  console.log("Connecting to the database as id: " + connection.threadId);
});

export default connection;
