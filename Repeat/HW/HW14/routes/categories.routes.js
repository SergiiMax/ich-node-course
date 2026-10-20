import { Router } from "express";
import { createCategory } from "../controllers/categories.controller.js";

const router = Router();

router.post("/", createCategory);

export default router;
