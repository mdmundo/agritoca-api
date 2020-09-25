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
  getPaginationParams: ({
    sort = 'id',
    direction = 'asc',
    page = 0,
    pagesize = 30
  }) => ({
    orderBy: [{ column: sort, order: direction }, 'id'],
    offset: pagesize * page,
    limit: pagesize
  }),
  getPaginationQueriesSchema: () => ({
    sort: Joi.string().max(63),
    direction: Joi.string()
      .max(4)
      .pattern(/^(a|de)sc$/),
    page: Joi.string()
      .pattern(/^[0-9]+$/)
      .max(6),
    pagesize: Joi.string()
      .pattern(/^[0-9]+$/)
      .max(3)
  })
};
