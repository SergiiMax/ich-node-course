import express from "express";
import "dotenv/config";
import sequelize from "./config/db.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const server = app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection to the database has been successfully');
    console.log(`Server running at the http://localhost:${PORT}`);
  } catch (error) {
    console.error('Unable to connect to the database', error.message);
  }
});

// Событие 'error' срабатывает, если сервер не смог запуститься
server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    // Порт уже занят другим процессом (например, запущена вторая копия приложения)
    console.error(
      `Порт ${PORT} уже занят. Освободите его или укажите другой PORT в .env`,
    );
  } else if (error.code === "EACCES") {
    // Нет прав на порт (на Linux/macOS порты ниже 1024 требуют прав администратора)
    console.error(`Нет прав для запуска на порту ${PORT}`);
  } else {
    console.error("Не удалось запустить сервер:", error);
  }
  process.exit(1);
  //  // завершаем процесс с кодом ошибки
});


