const userRouter = require('./user');
const producerRouter = require('./producer');
const productRouter = require('./product');
const producerProductRouter = require('./producer-product');
const basketRouter = require('./basket');

module.exports = {
  userRouter,
  producerRouter,
  productRouter,
  producerProductRouter,
  basketRouter
};
