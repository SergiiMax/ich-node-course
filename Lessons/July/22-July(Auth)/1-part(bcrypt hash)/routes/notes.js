import { Router } from 'express';
import Note from '../db/models/notes.js';

const router = Router();

router.get('/', async (req, res) => {
  const notes = await Note.findAll();
  res.json(notes);
});

router.post('/notes', async (req, res) => {
  const { title, content } = req.body;
  const note = await Note.create({ title, content});
  res.status(201).json(note);
});

export default router;