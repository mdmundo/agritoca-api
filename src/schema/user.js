const { Joi } = require('celebrate');

const signSchema = {
  body: Joi.object().keys({
    tokenId: Joi.string()
  })
};

const searchSchema = {
  query: {
    id: Joi.string()
      .pattern(/^[0-9]+$/)
      .max(20)
  }
};

module.exports = { searchSchema };
