const userRouter = require('./user');
const producerRouter = require('./producer');
const productRouter = require('./product');
const producerProductRouter = require('./producer-product');
const basketRouter = require('./basket');
const producersHistoryRouter = require('./producers-history');
const productsHistoryRouter = require('./products-history');
const producerProductsHistoryRouter = require('./producer-products-history');

module.exports = {
  userRouter,
  producerRouter,
  productRouter,
  producerProductRouter,
  basketRouter,
  producersHistoryRouter,
  productsHistoryRouter,
  producerProductsHistoryRouter
};
