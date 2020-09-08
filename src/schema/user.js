const { Joi } = require('celebrate');

const createSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email().max(255),
    password: Joi.string().required().min(8).max(255)
  })
};

const updateSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().max(255),
    password: Joi.string().min(8).max(255)
  })
};

const searchSchema = {
  query: {
    id: Joi.string()
      .pattern(/^[0-9]+$/)
      .max(20)
  }
};

module.exports = { createSchema, updateSchema, searchSchema };
