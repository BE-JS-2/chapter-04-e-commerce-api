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
   await queryInterface.bulkInsert('products',[
     {
       categoryId: 1,
       sellerId:  1,
       name: "Teh Botol 100 ml",
       price: 5000,
       stock: 10,
       createdAt: new Date(),
       updatedAt : new Date()
     },
     {
      categoryId: 4,
      sellerId:  2,
      name: "Type C Jack Audio",
      price: 100000,
      stock: 10,
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
     return queryInterface.bulkDelete('sellers', null, {truncate:true, restartIdentity:true});

  }
};
