import { Router } from "express";
import { createPost, getAllPosts } from "../controllers/posts.controller.js";

const router = Router()

router.get('/', getAllPosts)
router.post('/', createPost)

export default router;