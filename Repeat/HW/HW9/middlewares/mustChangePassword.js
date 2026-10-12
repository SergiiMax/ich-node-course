import User from "../models/user.js";

const mustChangePassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (user.mustChangePassword) {
      return res.redirect("/change-password");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error(error.message)
    res.status(500).json({
        message: "Error occured checking user at server"
    })
  }
};

export default mustChangePassword;