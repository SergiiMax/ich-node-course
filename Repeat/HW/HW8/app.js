import express from "express";
import "dotenv/config";
import sequelize from "./config/db.js";
import Book from "./models/Book.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded());

function createError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

app.get("/", (_req, res) => {
  res.send("Home Page!!!");
});

app.get("/books", async (_req, res, next) => {
  try {
    const books = await Book.findAll();
    if (books.length === 0) {
      console.log("No books found!");
    }
    res.json(books);
  } catch (error) {
    next(error);
  }
});

app.post("/books", async (req, res, next) => {
  try {
    const { title, author, year } = req.body;

    const newBook = await Book.create({ title, author, year });
    console.log("Book created: ", newBook.toJSON());
    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
});

app.put("/books/:id", async (req, res, next) => {
  try {
    const bookId = parseId(req.params.id);
    if (!bookId) {
      throw createError(400, "Invalid book ID");
    }

    const { title, author, year } = req.body;
    if (typeof title !== "string" || !title.trim()) {
      throw createError(400, 'Field "title" is required');
    }
    if (typeof author !== "string" || !author.trim()) {
      throw createError(400, 'Field "author" is required');
    }
    if (!Number.isInteger(year)) {
      throw createError(400, 'Field "year" must be an integer');
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      throw createError(404, "Book not found");
    }

    await book.update({ title: title.trim(), author: author.trim(), year });
    res.json(book);
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return next(createError(409, "Book with this title already exists"));
    }
    next(error);
  }
});

app.delete("/books/:id", async (req, res, next) => {
  try {
    const bookId = parseId(req.params.id);
    if (!bookId) {
      throw createError(400, "Invalid book ID");
    }

    const book = await Book.findByPk(bookId)
    if (!book) {
      throw createError(404, "Book not found");
    }
    await book.destroy()
    res.json({ message: "Book was successfully deleted" });

  } catch (error) {
    next(error)
  }
});

app.use((req, _res, next) => {
    next(createError(404, `Route ${req.method} ${req.originalUrl} not found`));
});

app.use((error, _req, res, _next) => {
  const status = error.status || 500;

  if (status === 500) {
    console.error(error.stack);
  }

  res.status(status).json({
    message: status === 500 ? "Internal Server Error" : error.message,
  });
});

async function start() {
  try {
    await sequelize.authenticate();
    console.log("Connect to the database successfully");
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database: ", error.message);
  }
}

start();
