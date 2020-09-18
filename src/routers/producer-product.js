const express = require('express');
const { celebrate } = require('celebrate');
const multer = require('multer');
const multerConfig = require('../utils/multer');
const { auth, isMod } = require('../middleware/auth');
const { producerProductSchema } = require('../schemas');
const { producerProductController } = require('../controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();
const upload = multer(multerConfig);

router.get(
  '/producerProducts',
  celebrate(producerProductSchema.search, joiOptions),
  producerProductController.read
);

router.get(
  '/producerProducts/:id',
  celebrate(producerProductSchema.search, joiOptions),
  producerProductController.readById
);

router.get(
  '/producerProducts/:id/picture',
  celebrate(producerProductSchema.search, joiOptions),
  producerProductController.getPicture
);

router.post(
  '/producerProducts',
  auth,
  isMod,
  celebrate(producerProductSchema.create, joiOptions),
  producerProductController.create
);

router.post(
  '/producerProducts/:id/picture',
  auth,
  isMod,
  upload.single('picture'),
  producerProductController.setPicture,
  (error, req, res, next) => {
    return res.status(400).json({ message: 'Can not upload that' });
  }
);

router.patch(
  '/producerProducts/:id',
  auth,
  isMod,
  celebrate(producerProductSchema.update, joiOptions),
  producerProductController.update
);

router.delete(
  '/producerProducts/:id',
  auth,
  isMod,
  producerProductController.delete
);

module.exports = router;
