const { userCreateSchema, userUpdateSchema } = require('./user');
const { producerCreateSchema, producerUpdateSchema } = require('./producer');
const { productCreateSchema, productUpdateSchema } = require('./product');
const {
  producerProductCreateSchema,
  producerProductUpdateSchema
} = require('./producer-product');
const { basketCreateSchema, basketUpdateSchema } = require('./basket');
const {
  basketItemCreateSchema,
  basketItemUpdateSchema
} = require('./basket-item');

module.exports = {
  userCreateSchema,
  userUpdateSchema,
  producerCreateSchema,
  producerUpdateSchema,
  productCreateSchema,
  productUpdateSchema,
  producerProductCreateSchema,
  producerProductUpdateSchema,
  basketCreateSchema,
  basketUpdateSchema,
  basketItemCreateSchema,
  basketItemUpdateSchema
};
