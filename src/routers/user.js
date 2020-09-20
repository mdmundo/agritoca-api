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

router.get(
  '/users/:id',
  auth,
  isAdmin,
  celebrate(userSchema.search, joiOptions),
  userController.readById
);

router.get('/me', auth, userController.self);

router.post(
  '/users',
  celebrate(userSchema.sign, joiOptions),
  userController.sign
);

router.patch(
  '/users/:id/set/:privilege',
  auth,
  isAdmin,
  celebrate(userSchema.search, joiOptions),
  userController.setPrivilege
);

router.patch(
  '/users/:id/unset',
  auth,
  isAdmin,
  celebrate(userSchema.search, joiOptions),
  userController.unsetPrivilege
);

router.delete('/me', auth, userController.delete);

module.exports = router;
