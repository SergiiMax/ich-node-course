import mongoose, { isValidObjectId } from "mongoose";
import Product from "../models/Product.js";

export async function addItem(req, res, next) {
  try {
    const { name, quantity, price } = req.body ?? {};

    if (!name.trim() || typeof name !== "string") {
      return res.status(400).json({
        message: "Name is required and must be not empty string",
      });
    }

    if (!quantity || !Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({
        message: "Quantity is required and must be number > 0 ",
      });
    }

    if (!price || typeof price !== "number" || price < 0) {
      return res.status(400).json({
        message: "Price is required and must be number > 0",
      });
    }

    const cleanName = name.trim();

    const existingProduct = await Product.findOne({ name: cleanName, price });

    if (existingProduct) {
      existingProduct.quantity += quantity;

      await existingProduct.save();
      return res.json({
        message: "Product already exists, it's quantity was increased",
        product: existingProduct,
      });
    }

    const product = await Product.create({ name: cleanName, quantity, price });
    res.status(201).json({
      message: "Product is successfully created",
      product,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllProducts(_req, res, next) {
  try {
    const products = await Product.find().sort({ name: 1 });

    if (products.length === 0) {
      return res.json({
        message: "No any products found",
      });
    }

    res.json({
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
}

export async function fullUpdateProductById(req, res, next) {
  try {
    const productId = req.params.id;
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        message: "Invalid product's ID",
      });
    }

    const { name, quantity, price } = req.body ?? {};

     if (name !== undefined) {
        if (!name.trim() || typeof name !== "string") {
      return res.status(400).json({
        message: "Name is required and must be not empty string",
      });
    }
    }

    if (quantity !== undefined) {
        if (!quantity || !Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({
        message: "Quantity is required and must be number > 0 ",
      });
    }
    }

    if (price !== undefined) {
        if (!price || typeof price !== "number" || price < 0) {
      return res.status(400).json({
        message: "Price is required and must be number > 0",
      });
    }
    }

    const cleanName = name.trim()
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { name: cleanName, price, quantity },
      { returnDocument: "after", runValidators: true },
    );

    if (!updatedProduct) {
        return res.status(404).json({
            message: "Product was not found"
        })
    }

    res.json({
      message: "Product was successfully updated",
      updatedProduct,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateProductById(req, res, next) {
    try {
        const productId = req.params.id;
    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({
        message: "Invalid product's ID",
      });
    }

    const { name, quantity, price } = req.body ?? {};

    const updates = {};

    if (name !== undefined) {
        if (!name.trim() || typeof name !== "string") {
      return res.status(400).json({
        message: "Name is required and must be not empty string",
      });
    }
    updates.name = name.trim()
    }

    if (quantity !== undefined) {
        if (!quantity || !Number.isInteger(quantity) || quantity < 0) {
      return res.status(400).json({
        message: "Quantity is required and must be number > 0 ",
      });
    }
    updates.quantity = quantity
    }

    if (price !== undefined) {
        if (!price || typeof price !== "number" || price < 0) {
      return res.status(400).json({
        message: "Price is required and must be number > 0",
      });
    }
    updates.price = price
    }

      const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: updates }, // $set поменяет только переданные поля, остальные трогать не будет...
      { returnDocument: "after", runValidators: true }, // upsert: true - если не найдет обьект в базе по id то создаст новый
    );

    if (!updatedProduct) {
        return res.status(404).json({
            message: "Product was not found"
        })
    }

    res.json({
      message: "Product was successfully updated",
      updatedProduct,
    });
    } catch (error) {
        next(error)
    }
}
