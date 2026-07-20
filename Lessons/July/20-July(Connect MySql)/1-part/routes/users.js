import { Router } from "express";
import User from "../db/models/user.js";

const router = Router()

router.post('/register', async (req ,res) => {
    const { name, email, password} = req.body

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Name, email, password are required"})
    }

    if (password.length < 6) {
       return res.status(400).json({ message: "password must be at least 6 characters"})
    }

    try {
        const user = await User.create({name, email, password})
        return res.status(201).json(user)
    } catch (e) {
        console.error(e.message)
    }
})

export default router