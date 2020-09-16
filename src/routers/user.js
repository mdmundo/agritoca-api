const express = require('express');
const { celebrate } = require('celebrate');
const { auth, isAdmin } = require('../middleware/auth');
const { userSchema } = require('../schemas');
const { userController } = require('../controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();

router.get(
  '/users',
  auth,
  isAdmin,
  celebrate(userSchema.search, joiOptions),
  userController.read
);

router.get('/users/:id', auth, isAdmin, userController.readById);

router.get('/me', auth, userController.self);

router.post(
  '/users',
  celebrate(userSchema.sign, joiOptions),
  userController.sign
);

router.post(
  '/users/:id/set/:privilege',
  auth,
  isAdmin,
  userController.setPrivilege
);

router.post('/users/:id/unset', auth, isAdmin, userController.unsetPrivilege);

router.delete('/me', auth, userController.delete);

module.exports = router;
