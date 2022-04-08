"use strict";
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const sellerData = [];
    let tempEmail;

    for (let index = 0; index < 21; index++) {
      const dummyData = {
        name: faker.company.companyName(),
        email: (tempEmail = faker.internet.email()),
        password: await bcrypt.hash(tempEmail, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      sellerData.push(dummyData);
    }
    await queryInterface.bulkInsert("Sellers", sellerData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Sellers", null, {});
  },
};
