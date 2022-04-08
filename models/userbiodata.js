"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserBiodata extends Model {
    static associate(models) {
      UserBiodata.belongsTo(models.User, {
        foreignKey: "userId",
      });
    }
  }
  UserBiodata.init(
    {
      userId: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      birthdate: DataTypes.DATE,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "UserBiodata",
    }
  );
  return UserBiodata;
};
