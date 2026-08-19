import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../db/models/User.js";
import { getAllUsers, getProfile } from "../controllers/users.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.get("/", authMiddleware, getAllUsers);

export default router;
