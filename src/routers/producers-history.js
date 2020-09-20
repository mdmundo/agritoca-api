const express = require('express');
const { celebrate } = require('celebrate');
const { auth, isMod } = require('../middleware/auth');
const { producersHistorySchema } = require('../schemas');
const { producersHistoryController } = require('../controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();

router.get(
  '/producersHistory',
  auth,
  isMod,
  celebrate(producersHistorySchema.search, joiOptions),
  producersHistoryController.read
);

router.get(
  '/producersHistory/:id',
  auth,
  isMod,
  celebrate(producersHistorySchema.search, joiOptions),
  producersHistoryController.readById
);

module.exports = router;
