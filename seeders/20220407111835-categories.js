'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Categories', [
      { id: 1, name: 'Electronic' },
      { id: 2, name: 'Household' },
      { id: 3, name: 'Camping Equipment' },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Categories')
  }
};
