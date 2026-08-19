import express from "express";
import {
  createComment,
  getComments,
} from "../controllers/commentController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/comments", authMiddleware, createComment);
router.get("/comments", authMiddleware, getComments);

export default router;
