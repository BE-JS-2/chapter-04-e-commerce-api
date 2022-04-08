"use strict";
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const categoryData = [];

    for (let index = 0; index < 21; index++) {
      const dummyData = {
        name: faker.commerce.department(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      categoryData.push(dummyData);
    }
    await queryInterface.bulkInsert("Categories", categoryData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Categories", null, {});
  },
};
