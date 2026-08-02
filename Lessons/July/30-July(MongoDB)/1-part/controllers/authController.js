import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ error: "Fill all fields" });
    }
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
        return res.status(409).json({message: "User with this email or username already exists"})
    }
    const user = await User.create({username, email, password})
    res.status(201).json(user)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration error", error: error.message });
  }
};
