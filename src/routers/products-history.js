const express = require('express');
const { celebrate } = require('celebrate');
const { auth, isMod } = require('../middleware/auth');
const { productsHistorySchema } = require('../schemas');
const { productsHistoryController } = require('../controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();

router.get(
  '/productsHistory',
  auth,
  isMod,
  celebrate(productsHistorySchema.search, joiOptions),
  productsHistoryController.read
);

router.get(
  '/productsHistory/:id',
  auth,
  isMod,
  celebrate(productsHistorySchema.search, joiOptions),
  productsHistoryController.readById
);

module.exports = router;
