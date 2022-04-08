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
   await queryInterface.bulkInsert('categories',[
     {
       name: 'Makanan',
       createdAt: new Date(),
       updatedAt : new Date()
     },
     {
      name: 'Minuman',
      createdAt: new Date(),
      updatedAt : new Date()
    },
    {
      name: 'Fashion',
      createdAt: new Date(),
      updatedAt : new Date()
    },
    {
      name: 'Elektronik',
      createdAt: new Date(),
      updatedAt : new Date()
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
     return queryInterface.bulkDelete('categories', null, {truncate:true, restartIdentity:true});


  }
};
