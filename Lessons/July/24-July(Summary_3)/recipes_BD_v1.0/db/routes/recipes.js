import { Router } from "express";
import Recipe from "../models/recipe.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error) {
 res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const recipe = await Recipe.findOne({ where: { id } });
    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    } else {
      res.json(recipe);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipe" });
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      name,
      instructions, 
      description,
      cuisine,
      difficulty,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      caloriesPerServing,
      rating,
      imageUrl,
    } = req.body;
    if (!name || !instructions) {
        return res.status(400).json({message: "Name and instructions required"})
    }

    if (name.length < 3 || name.length > 255) {
        return res.status(400).json({message: "Name must be from 3 to 255 characters"})
    }
    const recipe = await Recipe.create({
      name,
      description,
      instructions,
      cuisine,
      difficulty,
      prepTimeMinutes,
      cookTimeMinutes,
      servings,
      caloriesPerServing,
      rating,
      imageUrl,
    });
    res.status(201).json(recipe);
  } catch (error) {
    if(error.name === "SequelizeValidationError") {
        return res.status(400).json({message: error.message})
    } else {
        res.status(500).json({ error: "Failed to create a recipe" });
    }
  }
});

export default router;
