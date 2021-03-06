'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Transaction, { foreignKey: 'productId', as: 'transactions' })
      Product.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' })
      Product.belongsTo(models.Seller, { foreignKey: 'sellerId', as: 'seller' })
    }
  };
  Product.init({
    categoryId: DataTypes.INTEGER,
    sellerId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};