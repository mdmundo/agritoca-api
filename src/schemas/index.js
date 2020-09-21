const userSchema = require('./user');
const producerSchema = require('./producer');
const productSchema = require('./product');
const producerProductSchema = require('./producer-product');
const basketSchema = require('./basket');
const producersHistorySchema = require('./producers-history');
const productsHistorySchema = require('./products-history');
const producerProductsHistorySchema = require('./producer-products-history');

module.exports = {
  userSchema,
  producerSchema,
  productSchema,
  producerProductSchema,
  basketSchema,
  producersHistorySchema,
  productsHistorySchema,
  producerProductsHistorySchema
};
