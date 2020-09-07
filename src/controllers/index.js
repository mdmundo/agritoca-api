const userController = require('./user');
const producerController = require('./producer');
const productController = require('./product');
const producerProductController = require('./producer-product');
const userAuthController = require('./user-auth');
const userGoogleAuthController = require('./user-google-auth');
const basketController = require('./basket');
const basketItemController = require('./basket-item');

module.exports = {
  userController,
  producerController,
  productController,
  producerProductController,
  userAuthController,
  userGoogleAuthController,
  basketController,
  basketItemController
};
