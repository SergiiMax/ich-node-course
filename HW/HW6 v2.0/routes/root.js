import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.send('Hello, World!');
});

router.post('/', (req, res) => {
  res.json({ message: 'Данные получены', data: req.body });
});

export default router;
