const userResource = require('./user');
const producerResource = require('./producer');
const productResource = require('./product');
const producerProductResource = require('./producer-product');
const basketResource = require('./basket');
const producersHistoryResource = require('./producers-history');
const productsHistoryResource = require('./products-history');
const producerProductsHistoryResource = require('./producer-products-history');

module.exports = {
  userResource,
  producerResource,
  productResource,
  producerProductResource,
  basketResource,
  producersHistoryResource,
  productsHistoryResource,
  producerProductsHistoryResource
};
