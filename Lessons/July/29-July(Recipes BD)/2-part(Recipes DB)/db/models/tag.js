import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

class Tag extends Model {}

Tag.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    }
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "tags",
    underscored: true,
  },
);

export default Tag;
