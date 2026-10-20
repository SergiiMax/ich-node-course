import { Router } from "express";
import {
  createProduct,
  getAllProductsWithCategory,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getAllProductsWithCategory);
router.post("/", createProduct);

export default router;
