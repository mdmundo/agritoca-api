const express = require('express');
const { celebrate } = require('celebrate');
const { auth, isMod } = require('../middleware/auth');
const { producerProductSchema } = require('../schemas');
const { producerProductController } = require('../controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();

router.get('/producerProducts', producerProductController.read);

router.get('/producerProducts/:id', producerProductController.byId);

router.post(
  '/producerProducts',
  auth,
  isMod,
  celebrate(producerProductSchema.create, joiOptions),
  producerProductController.create
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
  producerProductController.remove
);

module.exports = router;
