const express = require('express');
const { celebrate } = require('celebrate');
const multer = require('multer');
const multerConfig = require('../utils/multer');
const { auth, isMod } = require('../middleware/auth');
const { productSchema } = require('../schemas');
const { productController } = require('../controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();
const upload = multer(multerConfig);

router.get(
  '/products',
  celebrate(productSchema.search, joiOptions),
  productController.read
);

router.get(
  '/products/:id',
  celebrate(productSchema.search, joiOptions),
  productController.readById
);

router.get(
  '/products/:id/picture',
  celebrate(productSchema.search, joiOptions),
  productController.getPicture
);

router.post(
  '/products',
  auth,
  isMod,
  celebrate(productSchema.create, joiOptions),
  productController.create
);

router.post(
  '/products/:id/picture',
  auth,
  isMod,
  upload.single('picture'),
  productController.setPicture,
  (error, req, res, next) => {
    return res.status(400).json({ message: 'Can not upload that' });
  }
);

router.patch(
  '/products/:id',
  auth,
  isMod,
  celebrate(productSchema.update, joiOptions),
  productController.update
);

router.delete(
  '/products/:id',
  auth,
  isMod,
  celebrate(productSchema.delete, joiOptions),
  productController.delete
);

module.exports = router;
