const { Joi } = require('celebrate');

module.exports = {
  update: {
    body: Joi.array().items(
      Joi.object({
        id: Joi.string().uuid(),
        name: Joi.string().max(255),
        items: Joi.string(),
        notes: Joi.string().max(255).empty('')
      })
    )
  }
};
