const express = require('express');
const { celebrate } = require('celebrate');
const { auth } = require('../middleware/auth');
const { basketSchema } = require('../schemas');
const { basketController } = require('../controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();

router.get('/baskets', auth, basketController.self);

router.patch(
  '/baskets',
  auth,
  celebrate(basketSchema.update, joiOptions),
  basketController.update
);

module.exports = router;
