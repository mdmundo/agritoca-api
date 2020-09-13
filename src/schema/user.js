const { Joi } = require('celebrate');

const user = {
  signSchema: {
    body: Joi.object().keys({
      tokenId: Joi.string()
    })
  },
  searchSchema: {
    query: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  }
};

module.exports = user;
