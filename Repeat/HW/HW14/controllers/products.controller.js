import mongoose from "mongoose";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

export async function createProduct(req, res, next) {
  try {
    const { name, price, category } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        message: "Product name is required",
      });
    }

    if (typeof price !== "number" || price < 0) {
      return res.status(400).json({
        message: "Price must be a positive number",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        message: "Invalid category ID",
      });
    }

    const categoryExists = await Category.exists({ _id: category });
    if (!categoryExists) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newProduct = await Product.create({ name, price, category });

    await newProduct.populate("category");

    res.status(201).json({
      message: "Product successfully created",
      newProduct,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllProductsWithCategory(req, res, next) {
  try {
    const products = await Product.find().sort({ _id: 1 }).populate("category");

    if (products.length === 0) {
      return res.status(404).json({ message: "Products not found" });
    }

    res.json(products);
  } catch (error) {
    next(error);
  }
}
