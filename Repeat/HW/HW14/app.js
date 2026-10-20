import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import categoryRoutes from "./routes/categories.routes.js";
import productRoutes from "./routes/products.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { wrongRoute } from "./middlewares/wrongRoute.js";

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

const app = express();

app.use(express.json());
app.use("/categories", categoryRoutes);
app.use("/products", productRoutes);
app.use(wrongRoute);
app.use(errorHandler);

async function start() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to MongoDB database");

    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

    const shutdown = async (signal) => {
      console.log(`Signal received: ${signal}. Shutting down.`);

      server.close(async () => {
        await mongoose.connection.close();
        console.log("Connection with MongoDB closed");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("MongoDB connection error", error.message);
    process.exit(1);
  }
}

start();
