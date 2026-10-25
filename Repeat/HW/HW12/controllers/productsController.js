import { ObjectId, ReturnDocument } from "mongodb";
import { getDb } from "../db/index.js";

function productsCollection() {
  return getDb().collection("products");
}

export async function createProduct(req, res, next) {
  try {
    const product = {
      ...req.body,
      createdAt: new Date(),
    };
    const result = await productsCollection().insertOne(product);

    res.status(201).json({
      message: "Product successfully created",
      result,
    });
  } catch (error) {
    next(error);
  }
}

export async function getAllProducts(_req, res, next) {
  try {
    const products = await productsCollection().find().toArray();

    res.json(products);
  } catch (error) {
    next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    const { id } = req.params;

    const product = await productsCollection().findOne({
      _id: new ObjectId(id),
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const { id } = req.params;

    const update = {
      $set: {
        ...req.body,
        updatedAt: new Date(),
      },
    };
    const product = await productsCollection().findOneAndUpdate(
      { _id: new ObjectId(id) },
      update,
      { returnDocument: ReturnDocument.AFTER },
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    res.json({
      message: "Product was successfully updated",
      product,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const { id } = req.params;

    const product = await productsCollection().findOneAndDelete({
      _id: new ObjectId(id),
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.json({
      message: "Product was successfully deleted",
      product,
    });
  } catch (error) {
    next(error);
  }
}
