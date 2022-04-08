'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserBiodata.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
    }
  };
  UserBiodata.init({
    userId: DataTypes.INTEGER,
    gender: DataTypes.STRING,
    birthdate: DataTypes.DATE,
    address: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'UserBiodata',
  });
  return UserBiodata;
};