import express, { urlencoded } from "express";
import "dotenv/config";
import pool, { checkConnection } from "./db.js";

const app = express();

app.use(express.json());
app.use(urlencoded());

const PORT = process.env.PORT || 3000;

app.get("/", (_req, res, next) => {
  try {
    res.json({ message: "Hello World!" });
  } catch (error) {
    next(error);
  }
});

app.post("/", (req, res) => {
  try {
    const { name, age } = req.body;
  if (!name && !age) {
    res.status(400);
    res.json({ message: "Name and Age are required!" });
    return;
  }
  res.json({ message: "Data recieved", data: { name: name, age: age } });
  } catch (error) {
    next(error)
  }
});

app.get("/products", async (req, res, next) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (error) {
    next(error);
  }
});

app.post("/products", async (req, res, next) => {
  try {
    const { name, price } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: "Name and price are required!" });
    }

    const [result] = await pool.query(
      "INSERT INTO products (name, price) VALUES (?, ?)",
      [name, price],
    );

    res.status(201).json({
      message: "Product added successfully",
      product: { id: result.insertId, name, price },
    });
  } catch (error) {
    next(error);
  }
});

app.use((req, res) => {
  res
    .status(404)
    .json({ message: `Route ${req.method} ${req.originalUrl} not found` });
});

app.use((error, _req, res, _next) => {
  const status = error.status || 500;

  if (status === 500) {
    console.error(error.status);
  }

  res.status(status).json({
    message: status === 500 ? "Internal  Server Error" : error.message,
  });
});

async function start() {
  try {
    await checkConnection();

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database", error.message);
    process.exit(1);
  }
}

start();