const { Joi } = require('celebrate');
const { getPaginationQueriesSchema } = require('../utils/public');

module.exports = {
  create: {
    body: Joi.object().keys({
      name: Joi.string().max(255)
    })
  },
  update: {
    body: Joi.object().keys({
      name: Joi.string().max(255)
    }),
    params: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  },
  search: {
    query: {
      name: Joi.string().max(255),
      ...getPaginationQueriesSchema()
    },
    params: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  },
  delete: {
    params: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  },
  createItem: {
    body: Joi.object().keys({
      producer_product_id: Joi.number().required().integer().positive()
    }),
    params: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  },
  deleteItem: {
    params: {
      id: Joi.string()
        .pattern(/^[0-9]+$/)
        .max(20)
    }
  }
};
