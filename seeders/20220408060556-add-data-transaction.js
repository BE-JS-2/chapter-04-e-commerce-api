"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const transactionData = [];

    for (let index = 0; index < 21; index++) {
      const dummyData = {
        userId: faker.datatype.number({ min: 1, max: 21 }),
        productId: faker.datatype.number({ min: 1, max: 21 }),
        productName: faker.commerce.product(),
        amount: faker.datatype.number({ min: 1, max: 100 }),
        productPrice: faker.commerce.price(10000, 1000000, 0),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      transactionData.push(dummyData);
    }
    await queryInterface.bulkInsert("Transactions", transactionData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Transactions", null, {});
  },
};
