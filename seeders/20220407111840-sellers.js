'use strict';
const bcrypt = require('bcrypt');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Sellers', [
      { id: '1403603b-1a25-487d-b33a-88c6ffc77b37', name: 'Logitech', email: 'logictech@email.com', password: bcrypt.hashSync('seller123', 10) },
      { id: 'b5cbf59f-8c1a-4935-954d-43862016f3f4', name: 'Consina', email: 'consina@email.com', password: bcrypt.hashSync('seller123', 10) },
      { id: '19f47722-d9e1-497a-9111-3a0d2cddd227', name: 'Unilever', email: 'unilever@email.com', password: bcrypt.hashSync('seller123', 10) }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Sellers')
  }
};
