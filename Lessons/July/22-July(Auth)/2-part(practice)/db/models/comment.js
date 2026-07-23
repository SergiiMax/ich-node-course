import { DataTypes, Model } from "sequelize";
import sequelize from "../connection.js";

class Comment extends Model {}

Comment.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    postId: { type: DataTypes.INTEGER, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false, unique: true },
    author: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Comment",
    tableName: "comments",
  },
);

export default Comment;
