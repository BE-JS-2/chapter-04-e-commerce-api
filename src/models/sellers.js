'use strict';
const {
  Model
} = require('sequelize');
const categories = require('./categories');
module.exports = (sequelize, DataTypes) => {
  class sellers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      sellers.hasMany(models.products, {foreignKey: 'sellerId'})
    }
  }
  sellers.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sellers',
  });
  return sellers;
};