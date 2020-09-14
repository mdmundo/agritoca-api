const express = require('express');
const { celebrate } = require('celebrate');
const multer = require('multer');
const multerConfig = require('./utils/multer');
const { auth, isAdmin, isMod } = require('./middleware/auth');
const {
  userSchema,
  producerSchema,
  productSchema,
  producerProductSchema,
  basketSchema,
  basketItemSchema
} = require('./schema');
const {
  userController,
  producerController,
  productController,
  producerProductController,
  basketController,
  basketItemController
} = require('./controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();
const upload = multer(multerConfig);

router.get(
  '/users',
  auth,
  isAdmin,
  celebrate(userSchema.search, joiOptions),
  userController.all
);
router.get('/users/me', auth, userController.self);
router.post(
  '/users',
  celebrate(userSchema.sign, joiOptions),
  userController.sign
);
router.post(
  '/users/set/:privilege',
  auth,
  isAdmin,
  userController.setPrivilege
);
router.post('/users/unset', auth, isAdmin, userController.unsetPrivilege);
router.delete('/users/me', auth, userController.remove);

router.get('/producers', producerController.all);
router.get(
  '/producers/:id',
  celebrate(producerSchema.search, joiOptions),
  producerController.byId
);
router.post(
  '/producers',
  auth,
  isMod,
  celebrate(producerSchema.create, joiOptions),
  producerController.create
);
router.patch('/producers', auth, producerController.update);
router.delete('/producers', auth, producerController.remove);

router.get(
  '/products',
  celebrate(productSchema.search, joiOptions),
  productController.all
);
router.get(
  '/products/:id',
  celebrate(productSchema.search, joiOptions),
  productController.byId
);
router.get(
  '/products/:id/picture',
  celebrate(productSchema.search, joiOptions),
  productController.picture
);
router.post(
  '/products/:id/picture',
  auth,
  isMod,
  upload.single('picture'),
  productController.upload,
  (error, req, res, next) => {
    res.status(400).json({ error });
  }
);
router.post(
  '/products',
  auth,
  isMod,
  celebrate(productSchema.create, joiOptions),
  productController.create
);
router.patch(
  '/products',
  auth,
  isMod,
  celebrate(productSchema.update),
  productController.update
);
router.delete('/products', auth, productController.remove);

router.get('/producerProducts', producerProductController.all);
router.get('/producerProducts/:id', auth, producerProductController.byId);
router.post('/producerProducts', auth, producerProductController.create);
router.patch('/producerProducts', auth, producerProductController.update);
router.delete('/producerProducts', auth, producerProductController.remove);

router.get('/baskets', auth, basketController.self);
router.get('/baskets/:id', auth, basketItemController.byId);
router.post('/baskets', auth, basketController.create);
router.post('/baskets', auth, basketItemController.create);
router.patch('/baskets', auth, basketController.update);
router.delete('/baskets', auth, basketController.remove);
router.delete('/baskets', auth, basketItemController.remove);

module.exports = router;
