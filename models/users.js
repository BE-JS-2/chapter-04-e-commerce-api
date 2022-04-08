'use strict';
const {
  Model
} = require('sequelize');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasOne(models.UserBiodata, { foreignKey: 'userId', as: 'biodata' });
      Users.belongsToMany(models.Products, { through: 'Transactions', foreignKey: 'userId' })
    }
  }
  Users.init({
    username: {
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
      beforeCreate: (user, option) => {
        user.id = crypto.randomUUID()
        user.password = bcrypt.hashSync(user.password, 10)
      }
    },
    sequelize,
    modelName: 'Users',
  });
  return Users;
};