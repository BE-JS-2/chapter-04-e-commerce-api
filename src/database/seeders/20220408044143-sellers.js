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
   await queryInterface.bulkInsert('sellers',[
     {
       name: 'NutriMart',
       email: 'nutrimart@mail.com',
       password: 'nutrimart123',
       createdAt: new Date(),
       updatedAt : new Date()
     },
     {
      name: 'EcMart',
      email: 'ecmart@mail.com',
      password: 'ecmartmart123',
      createdAt: new Date(),
      updatedAt : new Date()
    },
    {
      name: 'FoodMart',
      email: 'foodmart@mail.com',
      password: 'foodmart123',
      createdAt: new Date(),
      updatedAt : new Date()
    },
    {
      name: 'FashStore',
      email: 'fashstore@mail.com',
      password: 'fashstore123',
      createdAt: new Date(),
      updatedAt : new Date()
    }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('sellers', null, {truncate:true, restartIdentity:true});

  }
};
