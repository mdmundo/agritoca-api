const express = require('express');
const { celebrate } = require('celebrate');
const auth = require('./middleware/auth');
const {
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
} = require('./schema');
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

const joiOptions = { abortEarly: false };
const router = new express.Router();

router.get('/users', auth, userController.all);
router.get('/users/me', auth, userController.self);
router.post(
  '/users',
  celebrate(userCreateSchema, joiOptions),
  userController.create
);
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

router.get('/producerProducts', producerProductController.all);
router.get('/producerProducts/:id', auth, producerProductController.byId);
router.post('/producerProducts', auth, producerProductController.create);
router.patch('/producerProducts', auth, producerProductController.update);
router.delete('/producerProducts', auth, producerProductController.remove);

// authentication
router.post('/users/login', userAuthController.authenticate);
router.post('/users/logout', auth, userAuthController.logout);
router.post('/users/logoutAll', auth, userAuthController.logoutAll);
// google auth
router.get('/google/auth', userGoogleAuthController.link);
router.get('/google/callback', userGoogleAuthController.callback);
router.get('/google/me/:token', userGoogleAuthController.authenticate);

router.get('/baskets', auth, basketController.self);
router.get('/baskets/:id', auth, basketItemController.byId);
router.post('/baskets', auth, basketController.create);
router.post('/baskets', auth, basketItemController.create);
router.patch('/baskets', auth, basketController.update);
router.delete('/baskets', auth, basketController.remove);
router.delete('/baskets', auth, basketItemController.remove);

module.exports = router;
