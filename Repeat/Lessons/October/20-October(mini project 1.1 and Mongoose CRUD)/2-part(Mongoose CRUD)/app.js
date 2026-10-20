import express from "express";
import bcrypt from "bcryptjs";
import "dotenv/config";
import mongoose from "mongoose";
import User from "./models/User.js";
import Post from "./models/Post.js";

const PORT = process.env.PORT || 3000;
const dbURL = process.env.MONGO_URL;

const app = express();

app.use(express.json());

app.get("/", (_req, res) => {
  res.send("Home Page");
});

app.get("/users", async (_req, res, next) => {
  try {
    const users = await User.find()
      .select("-password")
      //1 - в алфавитном порядке(по возрастанию), -1 - в обратную сторону
      .sort({ name: 1 });
    if (!users) {
      return res.status(404).json({ message: "Users not found" });
    }
    res.json(users);
  } catch (error) {
    console.error("Error occured getting all users from BD", error.message);
  }
});

app.post("/users", async (req, res, _next) => {
  try {
    const { name, email, password, groups } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({
        error: "Name, email and password are required",
      });
    }

    // нужно сделать валидацию для полей

    const user = new User({ name, email, password, groups });

    await user.save();

    res.status(201).json(user);
  } catch (err) {
    // next(error)
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
    console.error(err.message);

    res.status(500).json({
      message: "Server error",
    });
  }
});

app.post("/posts/:userId", async (req, res, next) => {
  try {
    const { title, content } = req.body ?? {};
    const userId = req.params.userId;

    if (!title || !content) {
      return res.status(400).json({
        message: "Title and Content required",
      });
    }

    if (!mongoose.isObjectIdOrHexString(userId)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const post = await Post.create({
      title: title.trim(),
      content: content.trim(),
      author: userId,
    });
    res.status(201).json(post);
  } catch (error) {
    console.error(error.message);
  }
});

app.get("/posts", async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("author", "-password")
      .sort({ _id: -1 });
    res.json(posts);
  } catch (error) {
    console.error(error.message);
  }
});

app.patch("/users/:id", async (req, res, next) => {
  try {
    const { email } = req.body ?? {};
    const { id } = req.params;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        message: "Email is required and must be type fo string",
      });
    }

    if (!mongoose.isObjectIdOrHexString(id)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: { email: email.trim().toLowerCase() } }, // $set не обязателен, mongoose поставит его сам за нас...
      { returnDocument: 'after', runValidators: true },
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error(error.message);
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
