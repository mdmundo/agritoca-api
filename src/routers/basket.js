const express = require('express');
const { celebrate } = require('celebrate');
const { auth, isMod } = require('../middleware/auth');
const { basketSchema, basketItemSchema } = require('../schemas');
const { basketController, basketItemController } = require('../controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();

router.get('/baskets', auth, basketController.self);

router.get('/baskets/:id', auth, basketItemController.readById);

router.post('/baskets', auth, basketController.create);

router.post('/baskets', auth, basketItemController.create);

router.patch('/baskets', auth, basketController.update);

router.delete('/baskets', auth, basketController.remove);

router.delete('/baskets', auth, basketItemController.remove);

module.exports = router;
