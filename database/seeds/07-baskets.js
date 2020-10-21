const userBaskets = require('./baskets/template');

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('baskets')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('baskets').insert([
        { user_id: 1, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 2, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 3, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 4, user_baskets: JSON.stringify(userBaskets) }
      ]);
    });
};
