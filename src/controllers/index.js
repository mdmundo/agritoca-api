const userController = require('./user');
const producerController = require('./producer');
const productController = require('./product');
const producerProductController = require('./producer-product');
const userGoogleAuthController = require('./user-google-auth');
const basketController = require('./basket');
const basketItemController = require('./basket-item');

module.exports = {
  userController,
  producerController,
  productController,
  producerProductController,
  userGoogleAuthController,
  basketController,
  basketItemController
};
