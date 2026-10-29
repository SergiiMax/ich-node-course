import { Router } from "express";
import { addItem, fullUpdateProductById, getAllProducts } from "../controllers/productController.js";

const router = Router()

router.post('/', addItem)
router.get('/', getAllProducts)
router.put('/:id', fullUpdateProductById)
router.patch('/:id', updateProductById)

export default router;