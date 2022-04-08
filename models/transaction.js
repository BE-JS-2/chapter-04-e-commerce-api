"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    static associate(models) {
      Transaction.belongsTo(models.User, {
        foreignKey: "ProductId",
      });
      Transaction.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  Transaction.init(
    {
      userId: DataTypes.INTEGER,
      productName: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      productPrice: DataTypes.DOUBLE,
      productId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
