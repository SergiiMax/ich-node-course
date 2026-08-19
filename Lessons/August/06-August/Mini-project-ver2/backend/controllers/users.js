import { User } from "../db/models/index.js";

export async function getProfile(req, res) {
  res.json({
    user: req.user,
  });
};

export async function getAllUsers(req, res) {
      const allUsers = await User.findAll();
      res.json(allUsers)
}


