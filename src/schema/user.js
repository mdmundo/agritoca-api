const { Joi } = require('celebrate');

module.exports = {
  sign: {
    body: Joi.object().keys({
      tokenId: Joi.string()
    })
  },
  search: {
    query: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  }
};
