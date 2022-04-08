'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      Transaction.belongsTo(models.Product, { foreignKey: 'productId', as: 'product' })
    }
  };
  Transaction.init({
    userId: DataTypes.INTEGER,
    product_name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    product_price: DataTypes.DOUBLE,
    productId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};