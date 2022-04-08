'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('users',[
     {
       name: 'Ade Sugiantoro',
       password: 'adesugiantoro123',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
      name: 'Laelatul Nisa',
      password: 'abcde123',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Wasmad',
      password: 'password321',
      createdAt: new Date(),
      updatedAt: new Date()
    },

   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('users', null, {truncate:true, restartIdentity:true});
  }
};
