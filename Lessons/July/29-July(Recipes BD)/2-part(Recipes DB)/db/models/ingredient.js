import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

class Ingredient extends Model {}

Ingredient.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Ingredient",
    tableName: "ingredients",
    underscored: true,
  },
);

export default Ingredient;
