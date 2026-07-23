import { Router } from 'express';
import User from '../db/models/user.js';

const router = Router();

router.get('/', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
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