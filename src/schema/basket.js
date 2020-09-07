const { Joi } = require('celebrate');

const basketCreateSchema = {
  body: Joi.object().keys({
    user_id: Joi.number().required().integer().positive(),
    name: Joi.string().max(255)
  })
};

const basketUpdateSchema = {
  body: Joi.object().keys({
    user_id: Joi.number().integer().positive(),
    name: Joi.string().max(255)
  })
};

module.exports = { basketCreateSchema, basketUpdateSchema };
