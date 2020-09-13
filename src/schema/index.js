const userSchema = require('./user');
const producerSchema = require('./producer');
const productSchema = require('./product');
const producerProductSchema = require('./producer-product');
const basketSchema = require('./basket');
const basketItemSchema = require('./basket-item');

module.exports = {
  userSchema,
  producerSchema,
  productSchema,
  producerProductSchema,
  basketSchema,
  basketItemSchema
};
