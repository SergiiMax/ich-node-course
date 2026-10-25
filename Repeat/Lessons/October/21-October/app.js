import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import productsRouter from './routes/product.routes.js'

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(express.json());
app.use('/products', productsRouter)

app.get('/', (_req, res) => {
    res.send('Welcome to the Home Page!-)')
})

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("MongoDB successfully connected");

    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

    const shutdown = async (signal) => {
      console.log(`Signal received: ${signal}. Shutting duwn`);

      server.close(async () => {
        await mongoose.connection.close();
        console.log("Connection with MongoDB closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("Connection to MongoDB failed", error.message);
    process.exit(1);
  }
}

start();
