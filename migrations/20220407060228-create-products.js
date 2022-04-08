'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sellerId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      stock: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Date.now()
      }
    });
    await queryInterface.addConstraint('Products', {
      fields: ['categoryId'],
      type: 'foreign key',
      references: {
        table: 'Categories',
        field: 'id'
      },
      onDelete: 'RESTRICT'
    })
    await queryInterface.addConstraint('Products', {
      fields: ['sellerId'],
      type: 'foreign key',
      references: {
        table: 'Sellers',
        field: 'id'
      },
      onDelete: 'CASCADE'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Products');
  }
};