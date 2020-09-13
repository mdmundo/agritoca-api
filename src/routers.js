const express = require('express');
const { celebrate } = require('celebrate');
const multer = require('multer');
const multerConfig = require('./utils/multer');
const { auth, isAdmin, isMod } = require('./middleware/auth');
const {
  user,
  producer,
  product,
  producerProduct,
  basket,
  basketItem
} = require('./schema');
const {
  userController,
  producerController,
  productController,
  producerProductController,
  userGoogleAuthController,
  basketController,
  basketItemController
} = require('./controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();
const upload = multer(multerConfig);

router.get('/sign', userController.sign);

router.get(
  '/users',
  auth,
  isAdmin,
  celebrate(user.searchSchema, joiOptions),
  userController.all
);
router.get('/users/me', auth, userController.self);
router.post(
  '/users/set/:privilege',
  auth,
  isAdmin,
  userController.setPrivilege
);
router.post(
  '/users/unset/:privilege',
  auth,
  isAdmin,
  userController.unsetPrivilege
);
router.delete('/users/me', auth, userController.remove);

router.get('/producers', producerController.all);
router.get('/producers/:id', auth, producerController.byId);
router.post(
  '/producers',
  auth,
  isMod,
  celebrate(producer.createSchema, joiOptions),
  producerController.create
);
router.patch('/producers', auth, producerController.update);
router.delete('/producers', auth, producerController.remove);

router.get(
  '/products',
  celebrate(product.searchSchema, joiOptions),
  productController.all
);
router.get('/products/:id', auth, isMod, productController.byId);
router.get('/products/:id/picture', productController.picture);
router.post(
  '/products/:id/picture',
  auth,
  isMod,
  upload.single('picture'),
  productController.upload,
  (error, req, res, next) => {
    res.status(400).send({
      error: error.message
    });
  }
);
router.post(
  '/products',
  auth,
  isMod,
  celebrate(product.createSchema, joiOptions),
  productController.create
);
router.patch('/products', auth, productController.update);
router.delete('/products', auth, productController.remove);

router.get('/producerProducts', producerProductController.all);
router.get('/producerProducts/:id', auth, producerProductController.byId);
router.post('/producerProducts', auth, producerProductController.create);
router.patch('/producerProducts', auth, producerProductController.update);
router.delete('/producerProducts', auth, producerProductController.remove);

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
