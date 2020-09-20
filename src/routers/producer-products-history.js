const express = require('express');
const { celebrate } = require('celebrate');
const { auth, isMod } = require('../middleware/auth');
const { producerProductsHistorySchema } = require('../schemas');
const { producerProductsHistoryController } = require('../controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();

router.get(
  '/producerProductsHistory',
  auth,
  isMod,
  celebrate(producerProductsHistorySchema.search, joiOptions),
  producerProductsHistoryController.read
);

router.get(
  '/producerProductsHistory/:id',
  auth,
  isMod,
  celebrate(producerProductsHistorySchema.search, joiOptions),
  producerProductsHistoryController.readById
);

module.exports = router;
