"use strict";
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

module.exports = {
  async up(queryInterface, Sequelize) {
    const userData = [];
    let tempName, tempUsername;

    for (let index = 0; index < 21; index++) {
      const dummyData = {
        name: (tempName = faker.name.findName()),
        username: (tempUsername = faker.internet.userName(tempName)),
        password: await bcrypt.hash(tempUsername, 10),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      userData.push(dummyData);
      userData[0].username = "admin";
      userData[0].name = "admin";
      userData[0].password = await bcrypt.hash("admin", 10);
    }
    await queryInterface.bulkInsert("Users", userData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
