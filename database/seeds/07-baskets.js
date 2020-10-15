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
        { user_id: 4, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 5, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 6, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 7, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 8, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 9, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 10, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 11, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 12, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 13, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 14, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 15, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 16, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 17, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 18, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 19, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 20, user_baskets: JSON.stringify(userBaskets) },
        { user_id: 21, user_baskets: JSON.stringify(userBaskets) }
      ]);
    });
};
