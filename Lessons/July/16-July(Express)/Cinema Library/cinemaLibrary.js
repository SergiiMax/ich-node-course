import express from "express";
import "dotenv/config";

const PORT = process.env.PORT || 3000;
const APP_NAME = process.env.APP_NAME || "My App";
const app = express();
app.use(express.json());

const movies = [
  {
    id: 1,
    title: "Интерстеллар",
    year: 2014,
    genre: "sci-fi",
    ratings: [8, 9],
    reviews: [],
  },
  {
    id: 2,
    title: "Побег из Шоушенка",
    year: 1994,
    genre: "drama",
    ratings: [9, 10, 9],
    reviews: [],
  },
  {
    id: 3,
    title: "Матрица",
    year: 1999,
    genre: "sci-fi",
    ratings: [8, 8, 7],
    reviews: [],
  },
  {
    id: 4,
    title: "Зелёная миля",
    year: 1999,
    genre: "drama",
    ratings: [9, 9],
    reviews: [],
  },
];

app.get("/", (req, res) => {
  res.send(`Welcome to ${APP_NAME}`);
});

app.get("/api/movies", (req, res) => {
  res.json(movies);
});

app.get("/api/movies/:id", (req, res) => {
  const id = Number(req.params.id);
  const foundedMovie = movies.find((m) => m.id === id);

  if (!foundedMovie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  res.json(foundedMovie);
});

app.post("/api/movies", (req, res) => {
  const { title, year, genre } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Invalid title" });
  }

  const currentYear = new Date().getFullYear();
  if (!year || typeof year !== "number" || year < 1895 || year > currentYear) {
    return res.status(400).json({ error: "Invalid year" });
  }

  if (!genre || typeof genre !== "string" || genre.trim() === "") {
    return res.status(400).json({ error: "Invalid genre" });
  }

  const ids = movies.map((m) => m.id);
  const newId = movies.length === 0 ? 1 : Math.max(...ids) + 1;
  const newMovie = {
    id: newId,
    title,
    year,
    genre,
    ratings: [],
    reviews: [],
  };

  movies.push(newMovie);
  res.status(201).json(newMovie);
});

app.post("/api/movies/:id/ratings", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id === id);
  const { value } = req.body;

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  if (typeof value !== "number" || value < 1 || value > 10) {
    return res.status(400).json({ error: "Invalid value" });
  }

  movie.ratings.push(value);
  const sum = movie.ratings.reduce((acc, cur) => acc + cur, 0);
  const average = Number((sum / movie.ratings.length).toFixed(1));

  res.status(201).json({ average, count: movie.ratings.length });
});

app.post("/api/movies/:id/reviews", (req, res) => {
  const id = Number(req.params.id);
  const movie = movies.find((m) => m.id === id);
  const { author, text } = req.body;

  if (!movie) {
    return res.status(404).json({ error: "Movie not found" });
  }

  if (!author || !text || author === '' || text.length < 10) {
    return res.status(400).json({ error: "Invalid data" });
  }

  const newReview = {
    author,
    text,
    createdAt: new Date().toISOString()
  }

  movie.reviews.push(newReview);
  
  res.status(201).json(newReview);
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} started on port ${PORT}`);
});
