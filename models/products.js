'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Products extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Products.belongsTo(models.Categories, {
                foreignKey: 'categoryId',
            });
            Products.hasMany(models.Transactions, {
                foreignKey: 'productId',
            });
            Products.belongsToMany(models.Sellers, {
                foreignKey: 'sellerId',
            });
        }
    }
    Products.init({
        categoryId: DataTypes.INTEGER,
        sellerId: DataTypes.INTEGER,
        name: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        stock: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Products',
    });
    return Products;
};