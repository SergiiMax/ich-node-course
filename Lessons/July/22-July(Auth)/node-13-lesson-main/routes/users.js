import { Router } from 'express';
import { User, Post } from '../models/index.js';

const router = Router();

// POST /users: создаём пользователя из данных тела запроса.
router.post('/', async (req, res) => {
  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
  });

  return res.status(201).json(user);
});

// GET /users/email/:email: ищем пользователя по email.
router.get('/email/:email', async (req, res) => {
  const user = await User.findOne({
    where: { email: req.params.email },
  });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  return res.json(user);
});

// GET /users: возвращаем список всех пользователей.
router.get('/', async (req, res) => {
  const users = await User.findAll();
  return res.json(users);
});

// GET /users/:userId: возвращаем пользователя вместе с его постами.
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

// PATCH /users/:email: обновляем имя пользователя.
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

export default router;
