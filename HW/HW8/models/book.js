import { DataTypes, Model } from "sequelize";
import sequelize from "../connection.js";

class Book extends Model {}

Book.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    title: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.INTEGER, allowNull: false },
    author: { type: DataTypes.STRING, allowNull: false },
  },
  {
    sequelize,
    modelName: "Book",
    tableName: "books",
  },
);

export default Book;
