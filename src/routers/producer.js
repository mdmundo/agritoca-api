const express = require('express');
const { celebrate } = require('celebrate');
const { auth, isMod } = require('../middleware/auth');
const { producerSchema } = require('../schemas');
const { producerController } = require('../controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();

router.get('/producers', producerController.read);

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

router.patch(
  '/producers/:id',
  auth,
  isMod,
  celebrate(producerSchema.update, joiOptions),
  producerController.update
);

router.delete('/producers/:id', auth, isMod, producerController.remove);

module.exports = router;
