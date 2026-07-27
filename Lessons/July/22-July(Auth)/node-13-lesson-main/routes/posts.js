import { Router } from 'express';
import { Post, User } from '../models/index.js';

const router = Router();

// POST /posts: создаём пост для существующего пользователя.
router.post('/', async (req, res) => {
  const user = await User.findByPk(req.body.userId);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const post = await Post.create({
    title: req.body.title,
    content: req.body.content,
    userId: user.id,
  });

  return res.status(201).json(post);
});

export default router;
