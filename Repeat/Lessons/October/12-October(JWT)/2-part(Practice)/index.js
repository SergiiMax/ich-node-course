import express from "express";
import "dotenv/config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authenticateJWT from "./middlewares/authenticateJWT.js";

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const users = [
  {
    id: "1",
    username: "alex",
    email: "user@example.com",
    password: await bcrypt.hash("password123", 10),
    role: "user", // обычный пользователь
  },
  {
    id: "2",
    username: "boss",
    email: "admin@example.com",
    password: await bcrypt.hash("admin123", 10),
    role: "admin",
  },
];

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  const start = new Date();
  console.log(`Method: ${req.method}. URL route: ${req.url}`);

  // Событие finish срабатывает, когда ответ полностью отправлен. Так мы можем узнать время обработки в middleware
  res.on("finish", () => {
    const ms = Date.now() - start;
    console.log(`statusCode: ${res.statusCode}, ms: ${ms}`);
  });

  next(); // Обязательно вызываем, иначе застрянем в middleware
});

app.get("/", (req, res) => {
  res.send("Home Page");
  console.log(req.user);
});

app.get("/profile", authenticateJWT, (req, res) => {
  try {
    const userId = req.user.id;

    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(403).json({
        message: "Невалидный JWT",
      });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Ошибка сервера при запросе данных профиля",
    });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body ?? {};

  if (!email || !password) {
    return res.status(400).json({
      message: "Укажите email и пароль",
    });
  }

  try {
    const user = users.find((user) => user.email === email);

    const isMatch = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!user || !isMatch) {
      return res.status(401).json({
        message: "Неверный email или пароль",
      });
    }

    /**
     * Генерация JWT
     * jwt.sign(payload, secret, option)
     * payload - полезная нагрузка. Данные, которые попадут в токен.
     * Внимание: данные payload не шифруются, а только кодируются в Base64URL.
     * Любой может прочитать, например на jwt.io.
     * Поэтому никогда не кладем туда пароль или другие секреты.
     *
     * secret - ключ для подписи. Чтобы проверять целостность токена.
     * option - expiresIn задает поле exp (срок жизни токена)
     */
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email, // на практике конфиденциальные, секретные данные в полезной нагрузке не отправляем!
        role: user.role,
      },
      JWT_SECRET,
      {
        expiresIn: JWT_EXPIRES_IN,
      },
    );
    res.json({
      token,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      message: "Ошибка сервера при аутентификации",
    });
  }
});

app.patch("/update-profile", authenticateJWT, (req, res) => {
  const { username, email } = req.body ?? {};

  if (!username || !email) {
    return res.status(400).json({
      message: "Username and password are required",
    });
  }

  try {
    const userId = req.user.id;

  const user = users.find((user) => user.id === userId);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (users.some((u) => u.username === username.trim() && u.id !== userId)) {
    return res.status(409).json({
        message: 'Username already exists'
    })
  }

  if (users.some((u) => u.email === email.toLowerCase().trim() && u.id !== userId)) {
    return res.status(409).json({
        message: 'Email already exists'
    })
  }

  user.username = username;
  user.email = email;

  res.json({
    message: 'User data updated',
    user
  })
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
        message: "Error occurred update user"
    })
  }


});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
