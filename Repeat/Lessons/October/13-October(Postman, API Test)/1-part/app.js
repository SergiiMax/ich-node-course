import express from "express";
import "dotenv/config";
import sequelize from "./config/db.js";
import User from "./models/user.js";
import HttpError from "./utils/HttpError.js";

const parseId = (rawId) => {
  // Строка должна состоять только из цифр.
  // Отсекает 'abc', '-5', '1.5', '1e2', '0x10', ' 5 ', '' и т.д.
  if (typeof rawId !== "string" || !/^\d+$/.test(rawId)) {
    return null;
  }
  const id = Number(rawId);
  // id > 0 – отсекает '0' и '000'.
  // isSafeInteger – отсекает слишком большие числа,
  // которые JavaScript уже не может точно представить
  if (id <= 0 || !Number.isSafeInteger(id)) {
    return null;
  }
  return id;
};

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.get("/", (_req, res) => {
  res.send("Home page");
});

app.post("/users", async (req, res, next) => {
  try {
    const { name, email } = req.body;

    const newUser = await User.create({ name, email });
    console.log("User created: ", newUser.toJSON());
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
});

app.get("/users/:id", async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await User.findByPk(userId);
    if (!user) {
      console.log(`User with id:${userId} not found`);
      return next(new HttpError(400));
    }
    res.json({
      message: "User data: ",
      user,
    });
  } catch (error) {
    next(error);
  }
});

app.put("/users/:id", async (req, res, next) => {
  try {
    const userId = parseId(req.params.id);
    const { name, email } = req.body ?? {}

    if (!name || !email) {
        return next(new HttpError(400, 'Name and Email required'))
    }

    const user = await User.findByPk(userId)
    if (!user) {
        return next(new HttpError(404))
    }

    if (email !== user.email) {
        const existingUser = await User.findOne({ where: {email} })
        if (existingUser && existingUser.id !== user.id) {
            return next(new HttpError(409, 'User with such email already exists'))
        }
    }
    await user.update({name, email})
    res.json({
        message: 'User successfully updated',
        userUpdated: {
            name,
            email
        }
    })
    
  } catch (error) {
    next(error)
  }
});

app.use((error, _req, res, _next) => {
    console.log('[ERROR]: ', error.message);
    if (error instanceof HttpError) {
        return res.status(error.status).json({ error: error.message });
    }
    if (error.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: 'Ошибка валидации',
            details: error.errors.map((e) => e.message),
        });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
        return res.status(409).json({ error: 'Такая запись уже существует' });
    }
    res.status(500).json({ error: 'Внутренняя ошибка сервера' });
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database has been successfully");
    console.log(`Server running at http://localhost:${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database", error.message);
  }
});
