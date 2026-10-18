import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/productsController.js";
import { validateCreateProduct } from "../validators/validateProduct.js";
import { validateId } from "../validators/validateId.js";

const router = Router();

router.post("/", validateCreateProduct, createProduct);
router.get("/", getAllProducts);
router.get("/:id", validateId, getProductById);
router.put("/:id", validateId, validateCreateProduct, updateProduct);
router.delete("/:id", validateId, deleteProduct);

export default router;
