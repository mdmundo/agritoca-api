const { Joi } = require('celebrate');
const { getPaginationQueriesSchema } = require('../utils/public');

module.exports = {
  create: {
    body: Joi.object().keys({
      product_id: Joi.number().required().integer().positive(),
      producer_id: Joi.number().required().integer().positive(),
      brand: Joi.string().max(255),
      barcode: Joi.string().max(255),
      keywords: Joi.string().max(255)
    })
  },
  update: {
    body: Joi.object().keys({
      product_id: Joi.number().integer().positive(),
      producer_id: Joi.number().integer().positive(),
      brand: Joi.string().max(255),
      barcode: Joi.string().max(255),
      keywords: Joi.string().max(255)
    })
  },
  search: {
    query: {
      producer_id: Joi.number().integer().positive(),
      product_id: Joi.number().integer().positive(),
      brand: Joi.string().max(255),
      keywords: Joi.string().max(255),
      ...getPaginationQueriesSchema()
    },
    params: {
      id: Joi.number().integer().positive()
    }
  },
  delete: {
    params: {
      id: Joi.number().integer().positive()
    }
  }
};
