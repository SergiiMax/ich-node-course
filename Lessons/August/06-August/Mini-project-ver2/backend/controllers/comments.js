import { Comment } from "../db/models/index.js";
import { User } from "../db/models/index.js";

export const createComment = async (req, res) => {
  try {
    const { text } = req.body;

    const comment = await Comment.create({
      text,
      userId: req.user.id,
    });

    const user = await User.findByPk(req.user.id);

    res.status(201).json({
      id: comment.id,
      text: comment.text,
      author: user.name,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: {
        model: User,
        as: "user",
        attributes: ["id", "name"],
      },

      order: [["createdAt", "DESC"]],

      limit: 20,
    });

    res.json(comments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
