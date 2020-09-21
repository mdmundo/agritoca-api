const express = require('express');
const { celebrate } = require('celebrate');
const { auth, isMod } = require('../middleware/auth');
const { basketSchema } = require('../schemas');
const { basketController } = require('../controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();

router.get(
  '/baskets',
  auth,
  celebrate(basketSchema.search, joiOptions),
  basketController.self
);

router.get(
  '/baskets/:id/items',
  auth,
  celebrate(basketSchema.search, joiOptions),
  basketController.readById
);

router.post(
  '/baskets',
  auth,
  celebrate(basketSchema.create, joiOptions),
  basketController.create
);

router.post(
  '/baskets/:id/items',
  auth,
  celebrate(basketSchema.createItem, joiOptions),
  basketController.createItem
);

router.patch(
  '/baskets/:id',
  auth,
  celebrate(basketSchema.update, joiOptions),
  basketController.update
);

router.delete('/baskets', auth, basketController.deleteAll);

router.delete(
  '/baskets/:id',
  auth,
  celebrate(basketSchema.delete, joiOptions),
  basketController.delete
);

router.delete(
  '/baskets/items/:id',
  auth,
  celebrate(basketSchema.deleteItem, joiOptions),
  basketController.deleteItem
);

module.exports = router;
