import { DataTypes, Model } from "sequelize";
import sequelize from "../connection.js";

class Post extends Model {}

Post.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    text: { type: DataTypes.TEXT, allowNull: false, unique: true },
    author: { type: DataTypes.STRING, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  {
    sequelize,
    modelName: "Post",
    tableName: "posts",
  },
);

export default Post;
