const express = require('express');
const { celebrate, Joi } = require('celebrate');
const auth = require('./middleware/auth');

const router = new express.Router();

const {
  userController,
  userAuthController,
  userGoogleAuthController,
  productController
} = require('./controllers');

router.get('/users', auth, userController.all);
router.get('/users/me', auth, userController.self);
router.get('/users/:id', auth, userController.byId);
router.get('/products', auth, productController.all);
router.get('/products/:id', auth, productController.byId);

router.post(
  '/users',
  celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().required().min(2).max(255),
        email: Joi.string().required().email().max(255),
        password: Joi.string().required().min(8).max(255)
      })
    },
    { abortEarly: false }
  ),
  userController.create
); // and login
router.post('/products', auth, productController.create);

// authentication procedures
router.post('/users/login', userAuthController.authenticate);
router.post('/users/logout', auth, userAuthController.logout);
router.post('/users/logoutAll', auth, userAuthController.logoutAll);
// google auth
router.get('/google/auth', userGoogleAuthController.link);
router.get('/google/callback', userGoogleAuthController.callback);
router.get('/google/me/:token', userGoogleAuthController.authenticate);

router.patch('/users/me', auth, userController.update);

router.delete('/users/me', auth, userController.remove);

module.exports = router;
