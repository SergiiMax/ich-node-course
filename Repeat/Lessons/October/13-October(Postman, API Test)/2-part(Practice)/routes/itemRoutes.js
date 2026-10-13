import express from 'express';
import Item from '../db/models/item.js';


const router = express.Router();

router.post('/', async (req, res, _next) => {
  try {
    const { name, description } = req.body ?? {};

    if(!name && !description) {
      return res.status(400).json({message: 'name and description are required'});
    } 

    const newItem = await Item.create({ name, description }); 

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: 'server error during item create' });
  }
});

export default router;