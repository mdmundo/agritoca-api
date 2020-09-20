const { Joi } = require('celebrate');

module.exports = {
  search: {
    query: {
      name: Joi.string().max(255),
      hash: Joi.string().alphanum().max(6),
      producerId: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    },
    params: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  }
};
