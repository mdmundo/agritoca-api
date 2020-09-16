const express = require('express');
const { celebrate } = require('celebrate');
const { auth, isAdmin } = require('../middleware/auth');
const { userSchema } = require('../schema');
const { userController } = require('../controllers');

const joiOptions = { abortEarly: false };
const router = new express.Router();

router.get(
  '/users',
  auth,
  isAdmin,
  celebrate(userSchema.search, joiOptions),
  userController.all
);

router.get('/users/me', auth, userController.self);

router.post(
  '/users',
  celebrate(userSchema.sign, joiOptions),
  userController.sign
);

router.post(
  '/users/set/:privilege',
  auth,
  isAdmin,
  userController.setPrivilege
);

router.post('/users/unset', auth, isAdmin, userController.unsetPrivilege);

router.delete('/users/me', auth, userController.remove);

module.exports = router;
