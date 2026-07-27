import { Router } from 'express';
import User from '../db/models/user.js';
import Post from "../db/models/post.js"

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get('/email/:email', async (req, res) => {
  const user = await User.findOne({
    where: { email: req.params.email },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json(user);
});

router.get('/:userId', async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.userId },
    include: [{ model: Post, as: 'posts' }],
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json(user);
});

router.patch('/:email', async (req, res) => {
  const [updatedRowsCount] = await User.update(
    { name: req.body.name },
    { where: { email: req.params.email } },
  );

  if (updatedRowsCount === 0) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json({ message: 'User updated successfully' });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  res.status(201).json({name: name, email:email});
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: {email} })

  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({ error: 'Wrong email or password' })
    return
  }
  res.status(200).json({id: user.id, name: user.name, email: user.email})
})

export default router;