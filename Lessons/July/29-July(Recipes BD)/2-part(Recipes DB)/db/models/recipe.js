import { DataTypes, Model } from "sequelize";
import { sequelize } from "../connection.js";

class Recipe extends Model {}

Recipe.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
    },
    cuisineId: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(220),
      allowNull: false,
      unique: true,
    },
    imageUrl: {
        type: DataTypes.STRING(500),
        allowNull: true,
    },
    prepTimeMin: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: true,
    },
    cookTimeMin: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: true,
    },
    servings: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: true,
    },
    difficulty: {
        type: DataTypes.ENUM("easy", "medium", "hard"),
        allowNull: false,
        defaultValue: "easy"
    },
    caloriesPerServing: {
        type: DataTypes.SMALLINT.UNSIGNED,
        allowNull: true,
    },
    ratingAvg: {
        type: DataTypes.DECIMAL(3,2),
        allowNull: false,
        defaultValue: 0
    },
    review_count: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: "Recipe",
    tableName: "recipes",
    underscored: true,
  },
);

export default Recipe;
