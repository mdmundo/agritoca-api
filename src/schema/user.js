const { Joi } = require('celebrate');

const userCreateSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email().max(255),
    password: Joi.string().required().min(8).max(255),
    is_admin: Joi.boolean(),
    is_mod: Joi.boolean()
  })
};

const userUpdateSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().max(255),
    password: Joi.string().min(8).max(255),
    is_admin: Joi.boolean(),
    is_mod: Joi.boolean()
  })
};

module.exports = { userCreateSchema, userUpdateSchema };
