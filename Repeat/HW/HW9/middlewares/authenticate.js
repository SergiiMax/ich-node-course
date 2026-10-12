import User from "../models/user.js";
import bcrypt from "bcrypt";

const authenticate = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
        message: 'Error durinf authentication'
    })
  }
};

export default authenticate;