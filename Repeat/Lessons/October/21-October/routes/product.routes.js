import { Router } from "express";
import { createProduct, getAllProducts } from "../controllers/product.controllers.js";

const router = Router()

router.post('/', createProduct);
router.get('/', getAllProducts)

export default router;