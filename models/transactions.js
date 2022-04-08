'use strict';
const {
  Model
} = require('sequelize');
const crypto = require('crypto');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transactions.init({
    userId: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    product_price: DataTypes.DOUBLE,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transactions',
  });
  return Transactions;
};