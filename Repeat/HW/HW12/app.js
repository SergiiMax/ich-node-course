import express from "express";
import "dotenv/config";
import { closeDatabase, connectToDatabase } from "./db/index.js";
import productsRoutes from "./routes/productsRoutes.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use("/products", productsRoutes);

app.get("/", (_req, res) => {
  res.send("Welcome to the Products Page");
});

app.use((err, _req, res, _next) => {
  console.error(err);

  const status = err.status || 500;

  res.status(status).json({
    message: status === 500 ? "Server Error" : err.message,
  });
});

async function start() {
  try {
    await connectToDatabase();
    const server = app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });

    process.on("SIGINT", () => {
      server.close(async () => {
        await closeDatabase();
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Failed to start server fue to MongoDB connection issue");
  }
}

start();
