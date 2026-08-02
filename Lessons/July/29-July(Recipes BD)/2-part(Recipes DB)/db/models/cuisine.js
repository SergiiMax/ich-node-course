import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

class Cuisine extends Model {}

Cuisine.init(
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
    modelName: "Cuisine",
    tableName: "cuisines",
    underscored: true,
  },
);

export default Cuisine;
