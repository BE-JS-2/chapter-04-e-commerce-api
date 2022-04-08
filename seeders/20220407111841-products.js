'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Products', [
      { categoryId: 3, sellerId: 'b5cbf59f-8c1a-4935-954d-43862016f3f4', name: 'Consina Fly Sheet 3x3', price: 185000.0, stock: 5 },
      { categoryId: 3, sellerId: 'b5cbf59f-8c1a-4935-954d-43862016f3f4', name: 'Consina Half Dome Tas Ransel 30 L', price: 445000.0, stock: 15 },
      { categoryId: 3, sellerId: 'b5cbf59f-8c1a-4935-954d-43862016f3f4', name: 'Consina Magnum 6 Tenda', price: 1390000.0, stock: 8 },
      { categoryId: 1, sellerId: '1403603b-1a25-487d-b33a-88c6ffc77b37', name: 'Logitech MX Keys Keyboard Wireless Bluetooth Backlit for Power User', price: 2549000.0, stock: 10 },
      { categoryId: 1, sellerId: '1403603b-1a25-487d-b33a-88c6ffc77b37', name: 'Mouse Logitech B100 USB', price: 44500.0, stock: 50 },
      { categoryId: 1, sellerId: '1403603b-1a25-487d-b33a-88c6ffc77b37', name: 'Webcame Logitech C270 HD Original', price: 255000.0, stock: 18 },
      { categoryId: 2, sellerId: '19f47722-d9e1-497a-9111-3a0d2cddd227', name: 'Close Up Toothbrush Precision', price: 28500.0, stock: 118 },
      { categoryId: 2, sellerId: '19f47722-d9e1-497a-9111-3a0d2cddd227', name: 'Lifebuoy Sabun Mandi Cair Refill Lemon Fresh 850Ml Multipack', price: 184000.0, stock: 202 },
      { categoryId: 2, sellerId: '19f47722-d9e1-497a-9111-3a0d2cddd227', name: 'Sunsilk Shampoo Soft & Smooth 900ml', price: 80700.0, stock: 50 },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', {})
  }
};
