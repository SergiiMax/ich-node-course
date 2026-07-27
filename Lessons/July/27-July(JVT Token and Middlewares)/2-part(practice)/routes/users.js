import { Router } from 'express';
import User from '../db/models/user.js';
import { authenticate } from '../middlewares/auth.js';
import jwt from "jsonwebtoken"

const router = Router();

router.get('/', authenticate, async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.get('/:id', authenticate, async (req, res) => {
    const {id} = req.params.id
    const user = await User.findOne({where: id})

    if(!user) {
        res.status(404).json({message: "User not found"})
    }
    res.status(200).json({
        name: user.firstname,
        lastname: user.lastname,
        age: user.age,
        email: user.email
    })
})

router.post('/register', async (req, res) => {
  const { firstname, lastname, age, email, password } = req.body;
  const user = await User.create({ firstname, lastname, age, email, password });

  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ message: 'Name, email and password are required' });
  }
  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' });
  }

  res.status(201).json({message: {
        name: user.firstname,
        lastname: user.lastname,
        age: user.age,
        email: user.email
    }});
});

router.post('/login', async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.findOne({where: {email}})

    if (!email || !(await user.comparePassword(password))) {
        return res.status(401).json({error: "Wrong email or password"})
    }

    const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: "1d"})
    res.json({token, userInfo: {name: user.firstname,
        lastname: user.lastname,
        age: user.age,
        email: user.email}})
})

export default router;