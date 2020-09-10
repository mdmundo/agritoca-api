const { Joi } = require('celebrate');

const searchSchema = {
  query: {
    id: Joi.string()
      .pattern(/^[0-9]+$/)
      .max(20)
  }
};

module.exports = { searchSchema };
