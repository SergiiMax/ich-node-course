import { DataTypes, Model } from 'sequelize';
import sequelize from '../connection.js';

class Recipe extends Model {}

Recipe.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, len: [3, 255] } },
    description: { type: DataTypes.TEXT, allowNull: true},
    instructions: { type: DataTypes.TEXT, allowNull: false },
    cuisine: { type: DataTypes.STRING, allowNull: true },
    difficulty: { type: DataTypes.TEXT, allowNull: false, defaultValue: 'easy' },
    prepTimeMinutes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    cookTimeMinutes: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    servings: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1, validate: { min: 1 } },
    caloriesPerServing: { type: DataTypes.INTEGER, allowNull: true },
    imageUrl: { type: DataTypes.STRING, allowNull: true },
    rating: { type: DataTypes.DECIMAL(3,2), allowNull: false, defaultValue: 0 },
  },
  {
    sequelize,
    modelName: 'Recipe',
    tableName: 'recipes',
  }
);

export default Recipe;