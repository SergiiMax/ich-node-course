import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Book = sequelize.define(
  "Book",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "books",
    timestamps: true,
  },
);

export default Book;