const { Joi } = require('celebrate');

module.exports = {
  getWithoutPicture: (item) => ({
    ...item,
    picture: undefined
  }),
  getWithoutID: (item) => ({
    ...item,
    id: undefined
  }),
  getPublicProducer: (item) => ({
    ...item,
    cpf: undefined,
    cnpj: undefined,
    ie: undefined,
    im: undefined
  }),
  getSortingParams: ({ sort = 'id', direction = 'asc' }) => ({
    orderBy: [{ column: sort, order: direction }, 'id']
  }),
  getSortingSchema: () => ({
    sort: Joi.string().max(63),
    direction: Joi.string()
      .max(4)
      .pattern(/^(a|de)sc$/)
  })
};
