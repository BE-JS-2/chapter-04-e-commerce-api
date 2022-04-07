'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Transactions extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Transactions.belongsTo(models.Products, {
                foreignKey: 'productId',
            });
            Transactions.belongsTo(models.Users, {
                foreignKey: 'userId',
            });
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