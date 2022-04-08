'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false
      },
      product_name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      amount: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      product_price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      productId: {
        type: Sequelize.INTEGER,
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
    await queryInterface.addConstraint('Transactions', {
      fields: ['userId'],
      type: 'foreign key',
      name: 'fk_user_transaction',
      references: {
        table: 'Users',
        field: 'id'
      },
      onDelete: 'CASCADE'
    })
    await queryInterface.addConstraint('Transactions', {
      fields: ['productId'],
      type: 'foreign key',
      references: {
        table: 'Products',
        field: 'id'
      },
      onDelete: 'SET NULL'
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Transactions');
  }
};