import Category from "../models/Category.js";

export async function createCategory(req, res, next) {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string") {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const isExists = await Category.exists({ name: name });

    if (isExists) {
      return res.status(400).json({
        message: "This category already exists",
      });
    }

    const newCategory = await Category.create({ name: name });
    res.status(201).json({
      message: "Category successfully created",
      newCategory,
    });
  } catch (error) {
    next(error);
  }
}
