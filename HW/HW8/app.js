import express from "express";
import sequelize from "./config/db.js";
import Book from "./models/book.js";

const app = express();
app.use(express.json());

app.get("/books", async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch books" });
  }
});

app.post("/books", async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: "Failed to create a book" });
  }
});

add.put("/books/:id", async (req, res) => {
  try {
    const [updated] = await Book.update(req.body, {
      where: { id: req.params.id },
    });

    if (updated) {
      const updatedBook = await Book.findOne({
        where: {
          id: req.params.id,
        },
      });
      res.status(200).json(updatedBook)
    } else {
        res.status(404).json({ error: "Book not found" })
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to update the book" });
  }
});

app.delete('/books/:id', async (req, res) => {
    try {
        const deleted = await Book.destroy({ where: { id: req.params.id} })
        if (deleted) {
            res.status(204).json({ message: 'Book deleted' })
        } else {
            res.status(404).json({ error: "Book not found" })
        }
    } catch (error) {
        res.status(500).json({error: "Failed to delete book"})
    }    
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(
      "Connection to the database has been established successfully.",
    );
    console.log(`Server is running on http://localhost:${PORT}`);
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
});
