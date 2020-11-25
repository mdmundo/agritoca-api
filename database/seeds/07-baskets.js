exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('baskets')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('baskets').insert([
        { user_id: 1, user_baskets: 'A great and nice basket...' },
        { user_id: 2, user_baskets: 'A great and nice basket...' }
      ]);
    });
};
