import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import productRoutes from './routes/productRoutes.js'

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(express.json());
app.use('/products', productRoutes)

app.get("/", (_req, res, _next) => {
  res.send("Welcome to the Home Page!!!");
});

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error.message);
    process.exit(1);
  }
}

start();