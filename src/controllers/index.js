const userController = require('./user');
const producerController = require('./producer');
const productController = require('./product');
const producerProductController = require('./producer-product');
const basketController = require('./basket');
const producersHistoryController = require('./producers-history');
const productsHistoryController = require('./products-history');
const producerProductsHistoryController = require('./producer-products-history');

module.exports = {
  userController,
  producerController,
  productController,
  producerProductController,
  basketController,
  producersHistoryController,
  productsHistoryController,
  producerProductsHistoryController
};
