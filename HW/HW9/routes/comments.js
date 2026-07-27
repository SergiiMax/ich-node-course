import { Router } from 'express';
import Comment from '../models/comment.js';
import Post from '../db/models/post.js';

const router = Router();

router.get('/', async (req, res) => {
  const comments = await Comment.findAll();
  res.json(comments);
});

export default router;