import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      defaultValue: 0.00,
      allowNull: false,  
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "products",
    timestamps: false,
  },
);

export default Product;