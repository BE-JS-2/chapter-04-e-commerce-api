'use strict';
const {
    Model
} = require('sequelize');
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
    class Users extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Users.hasMany(models.Transactions, {
                foreignKey: 'userId',
            });
            Users.hasOne(models.UserBiodata, {
                foreignKey: 'userId',
            });
        }
    }
    Users.init({
        name: DataTypes.STRING,
        password: DataTypes.STRING
    }, {
        hooks: {
            beforeCreate: async(user) => {
                const hashedPw = await bcrypt.hash(user.password, 12);
                user.password = hashedPw;
            }
        },
        sequelize
    }, {
        sequelize,
        modelName: 'Users',
    });
    return Users;
};