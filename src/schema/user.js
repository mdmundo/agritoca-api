const { Joi } = require('celebrate');

const userCreateSchema = {
  body: Joi.object().keys({
    email: Joi.string().required().email().max(255),
    password: Joi.string().required().min(8).max(255)
  })
};

const userUpdateSchema = {
  body: Joi.object().keys({
    email: Joi.string().email().max(255),
    password: Joi.string().min(8).max(255)
  })
};

const userSearchSchema = {
  query: {
    id: Joi.string()
      .pattern(/^[0-9]+$/)
      .max(20)
  }
};

module.exports = { userCreateSchema, userUpdateSchema, userSearchSchema };
