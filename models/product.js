"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Seller, {
        foreignKey: "sellerId",
      });
      Product.belongsTo(models.Category, {
        foreignKey: "categoryId",
      });

      // Product.hasMany(models.Transaction, {
      //   foreignKey: "productId",
      // });
    }
  }
  Product.init(
    {
      categoryId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      stock: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
