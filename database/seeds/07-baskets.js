exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('baskets')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('baskets').insert([
        { user_id: 1, name: 'Aqa' },
        { user_id: 1, name: 'Ape' },
        { user_id: 1, name: 'Aba' },
        { user_id: 1, name: 'Abi' },
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
        { user_id: 7, name: 'Ali' },
        { user_id: 8, name: 'Ari' },
        { user_id: 9, name: 'Axa' },
        { user_id: 10, name: 'Atu' }
      ]);
    });
};
