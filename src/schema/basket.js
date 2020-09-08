const { Joi } = require('celebrate');

const createSchema = {
  body: Joi.object().keys({
    user_id: Joi.number().required().integer().positive(),
    name: Joi.string().max(255)
  })
};

const updateSchema = {
  body: Joi.object().keys({
    user_id: Joi.number().integer().positive(),
    name: Joi.string().max(255)
  })
};

module.exports = { createSchema, updateSchema };
