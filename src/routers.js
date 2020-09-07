const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('./middleware/auth');

const router = new express.Router();

const {
  userController,
  producerController,
  productController,
  producerProductController,
  userAuthController,
  userGoogleAuthController,
  basketController,
  basketItemController
} = require('./controllers');

// Routes
// Routes
// Routes
// Routes

module.exports = router;
