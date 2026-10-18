import express from "express";
import "dotenv/config";
import { closeDatabase, connectToDatabase } from "./db/index.js";
import usersRoutes from './routes/usersRoutes.js'

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use('/users', usersRoutes)

app.get("/", (_req, res) => {
  res.send("Home page");
});

async function start() {
  try {
    await connectToDatabase();
    const server = app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    // Закрываем сервер и подключение к MongoDB
    process.on("SIGINT", () => {
      server.close(async () => {
        await closeDatabase();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Failed to start the server due to MongoDB connection issue");
  }
}

start();
