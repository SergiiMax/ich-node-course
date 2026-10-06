import sequelize from "../config/db.js";
import Category from "./Category.js";
import Product from "./Product.js";

Category.hasMany(Product, {
  foreignKey: 'categoryId',
  as: 'products' // category.products
})

Product.belongsTo(Category, {
  foreignKey: "categoryId",
  as: 'category' // product.category
})

export { sequelize, Category, Product }