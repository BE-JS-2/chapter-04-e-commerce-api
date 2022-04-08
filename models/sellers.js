'use strict';
const {
  Model
} = require('sequelize');
const crypto = require('crypto');
module.exports = (sequelize, DataTypes) => {
  class Sellers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Sellers.hasMany(models.Products, { foreignKey: 'sellerId', as: 'product' })
    }
  }
  Sellers.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCreate: (seller, option) => {
        seller.id = crypto.randomUUID()
      }
    },
    sequelize,
    modelName: 'Sellers',
  });
  return Sellers;
};