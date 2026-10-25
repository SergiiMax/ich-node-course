import User from "../models/User.js";

export async function createUser(req, res, _next) {
  try {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and Password are required",
      });
    }

    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({
        message: "Username and Password must have string format",
      });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists.",
      });
    }

    const newUser = await User.create({ username, password });

    res.status(201).json(newUser);
    console.log(newUser);
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        message: error.message,
      });
    }
    if (error.code === 11000) {
      return res.status(409).json({ message: "User already exists" });
    }
    console.error(error.message);
    res.status(500).json({
        message: 'Server error while registering user'
    })
  }
}

export async function login(req, res, next) {
    try {
        const { username, password } = req.body ?? {}

        if (!username || !password) {
      return res.status(400).json({
        message: "Username and Password are required",
      });
    }

    if (typeof username !== "string" || typeof password !== "string") {
      return res.status(400).json({
        message: "Username and Password must have string format",
      });
    }

    const user = await User.findOne({ username })
    if (!user) {
        return res.status(401).json({
            message: 'Invalid username or password'
        })
    }

    
    } catch (error) {
        
    }
}
