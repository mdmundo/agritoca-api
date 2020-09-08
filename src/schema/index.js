const {
  userCreateSchema,
  userUpdateSchema,
  userSearchSchema
} = require('./user');
const { producerCreateSchema, producerUpdateSchema } = require('./producer');
const {
  productCreateSchema,
  productUpdateSchema,
  productSearchSchema
} = require('./product');
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
  userSearchSchema,
  producerCreateSchema,
  producerUpdateSchema,
  productCreateSchema,
  productUpdateSchema,
  productSearchSchema,
  producerProductCreateSchema,
  producerProductUpdateSchema,
  basketCreateSchema,
  basketUpdateSchema,
  basketItemCreateSchema,
  basketItemUpdateSchema
};
