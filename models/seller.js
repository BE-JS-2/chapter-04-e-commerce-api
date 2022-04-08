"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Seller extends Model {
    static associate(models) {
      // Seller.belongsTo(models.Product, {
      //   foreignKey: "sellerId",
      // });
      Seller.hasOne(models.Product, {
        foreignKey: "sellerId",
      });
    }
  }
  Seller.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Seller",
    }
  );
  return Seller;
};
