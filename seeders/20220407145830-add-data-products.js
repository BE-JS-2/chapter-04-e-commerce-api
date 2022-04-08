"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const productData = [];

    for (let index = 0; index < 21; index++) {
      const dummyData = {
        categoryId: faker.datatype.number({ min: 1, max: 21 }),
        sellerId: faker.datatype.number({ min: 1, max: 21 }),
        name: faker.commerce.product(),
        price: faker.commerce.price(10000, 1000000, 0),
        stock: faker.datatype.number({ min: 1, max: 100 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      productData.push(dummyData);
    }
    await queryInterface.bulkInsert("Products", productData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Products", null, {});
  },
};
