import express from "express";
import connectionDB from "./config/connection.js";
import Category from "./models/Category.js";
import Product from "./models/Product.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
await connectionDB();


app.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.create({ name });

    res.status(201).json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating category" });
  }
});

app.post("/products", async (req, res) => {
  try {
    const { name, price, category } = req.body;

    const product = await Product.create({
      name,
      price,
      category,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating product" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await Product.find().populate("category");
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching products" });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
