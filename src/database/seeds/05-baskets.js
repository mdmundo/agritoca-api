exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('baskets')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('baskets').insert([
        { user_id: 1 },
        { user_id: 1 },
        { user_id: 1 },
        { user_id: 1 },
        { user_id: 1, name: 'Curl' },
        { user_id: 1, name: 'Distribute' },
        { user_id: 1, name: 'Strip' },
        { user_id: 1, name: 'Identify' },
        { user_id: 1, name: 'Facilitate' },
        { user_id: 1, name: 'Reflect' },
        { user_id: 1, name: 'Write' },
        { user_id: 2, name: 'Wipe' },
        { user_id: 3, name: 'Train' },
        { user_id: 4, name: 'Exchange' },
        { user_id: 5, name: 'Claim' },
        { user_id: 6, name: 'Compel' },
        { user_id: 7 },
        { user_id: 8 },
        { user_id: 9 },
        { user_id: 10 }
      ]);
    });
};
