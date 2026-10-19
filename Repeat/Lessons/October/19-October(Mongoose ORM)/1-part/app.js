import express from "express";
import bcrypt from "bcryptjs";
import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";

const PORT = process.env.PORT || 3000;
const dbURL = process.env.MONGO_URL;

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Home Page");
});

app.post("/users", async (req, res, _next) => {
  try {
    const { name, email, password, groups } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    const user = new User({ name, email, password, groups });

    await user.save();

    res.status(201).json(user);
  } catch (err) {
    // Ошибка валидации схемы
    if (err.name === "ValidationError") {
      return res.status(400).json({
        error: err.message,
      });
    }
    // Нарушение уникального индекса
    if (err.code === 11000) {
      return res.status(409).json({
        error: "Email already registered",
      });
    }
    res.status(500).json({
      error: err.message,
    });
  }
});

async function start() {
  try {
    await mongoose.connect(dbURL);
    console.log("Successfully connected to MongoDB database");

    const server = app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    // Корректное завершение работы
    const shutdown = async (signal) => {
      console.log(`Signal recieved: ${signal}. Shutting down.`);

      server.close(async () => {
        await mongoose.connection.close();
        console.log("Connection with MongoDB closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT")); // Ctrl + C в терминале
    process.on("SIGTERM", () => shutdown("SIGTERM")); // остановка из Docker, pm2, хостинга
  } catch (error) {
    console.error("MongoDB connection error", error.message);
    process.exit(1);
  }
}

start();
