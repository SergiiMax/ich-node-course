import { Router } from 'express';
import { auth } from '../middleware/auth.js';
import {
    createPost,
    deletePostById,
    getAllPosts,
    getPostById,
} from "../controllers/posts.controller.js";

const router = Router();

router.post('/', auth, createPost);
router.get('/', getAllPosts);
router.get('/:id', getPostById)
router.delete('/:id', auth, deletePostById)

export default router;