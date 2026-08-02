import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

class MealType extends Model {}

MealType.init(
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
  },
  {
    sequelize,
    modelName: "MealType",
    tableName: "meal_types",
    underscored: true,
  },
);

export default MealType;
