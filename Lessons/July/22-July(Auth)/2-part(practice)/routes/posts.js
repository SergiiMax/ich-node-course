import { Router } from 'express';
import Post from '../db/models/post.js';
import Comment from '../db/models/comment.js';

const router = Router();

router.get('/', async (req, res) => {
  const posts = await Post.findAll();
  res.json(posts);
});

router.post('/create', async (req, res) => {
  const { title, text, author } = req.body;
  const post = await Post.create({ title, text, author });
  res.status(201).json(post);
});

router.post('/:postId/comments', async (req, res) => {
  const { text, author } = req.body;
  if(!text) {
   return res.status(400).json({message: "Comment content is required"})
  }
  const post = await Post.findByPk(req.params.postId)
  if(!post) {
    return res.status(404).json({message: "Post not found"})
  }

  const comment = await Comment.create({ text, author, postId: post.id });
  res.status(201).json(comment);
});

export default router;