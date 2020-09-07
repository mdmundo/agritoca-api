const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('./middleware/auth');

const router = new express.Router();

const {
  userController,
  producerController,
  productController,
  producerProductController,
  userAuthController,
  userGoogleAuthController,
  basketController,
  basketItemController
} = require('./controllers');

router.get('/users', auth, userController.all);
router.get('/users/me', auth, userController.self);
router.get('/users/adm/:id', auth, userController.byId);
router.post('/users', auth, userController.create);
router.patch('/users/me', auth, userController.update);
router.delete('/users/me', auth, userController.remove);

router.get('/producers', producerController.all);
router.get('/producers/:id', auth, producerController.byId);
router.post('/producers', auth, producerController.create);
router.patch('/producers', auth, producerController.update);
router.delete('/producers', auth, producerController.remove);

router.get('/products', productController.all);
router.get('/products/:id', auth, productController.byId);
router.post('/products', auth, productController.create);
router.patch('/products', auth, productController.update);
router.delete('/products', auth, productController.remove);

router.get('/producer-products', producerProductController.all);
router.get('/producer-products/:id', auth, producerProductController.byId);
router.post('/producer-products', auth, producerProductController.create);
router.patch('/producer-products', auth, producerProductController.update);
router.delete('/producer-products', auth, producerProductController.remove);

router.get('/baskets', auth, basketController.self);
router.get('/baskets/:id', auth, basketItemController.byId);
router.post('/baskets', auth, basketController.create);
router.post('/baskets', auth, basketItemController.create);
router.patch('/baskets', auth, basketController.update);
router.delete('/baskets', auth, basketController.remove);
router.delete('/baskets', auth, basketItemController.remove);

module.exports = router;
