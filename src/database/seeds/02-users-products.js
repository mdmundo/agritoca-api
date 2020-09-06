exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('users_products')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('users_products').insert([
        { product_id: 1, user_id: 1 },
        { product_id: 1, user_id: 2 },
        { product_id: 1, user_id: 3 },
        { product_id: 1, user_id: 4 },
        { product_id: 1, user_id: 5 },
        { product_id: 1, user_id: 6 },
        { product_id: 1, user_id: 7 },
        { product_id: 1, user_id: 8 },
        { product_id: 1, user_id: 9 },
        { product_id: 1, user_id: 10 },
        { product_id: 1, user_id: 11 },
        { product_id: 1, user_id: 12 },
        { product_id: 1, user_id: 13 },
        { product_id: 1, user_id: 14 },
        { product_id: 1, user_id: 15 },
        { product_id: 1, user_id: 16 },
        { product_id: 1, user_id: 17 },
        { product_id: 1, user_id: 18 },
        { product_id: 1, user_id: 19 },
        { product_id: 1, user_id: 20 },
        { product_id: 2, user_id: 2 },
        { product_id: 3, user_id: 2 },
        { product_id: 4, user_id: 2 },
        { product_id: 5, user_id: 2 },
        { product_id: 6, user_id: 2 },
        { product_id: 7, user_id: 2 },
        { product_id: 8, user_id: 2 },
        { product_id: 9, user_id: 2 },
        { product_id: 10, user_id: 2 },
        { product_id: 11, user_id: 2 },
        { product_id: 12, user_id: 2 },
        { product_id: 13, user_id: 2 },
        { product_id: 14, user_id: 2 },
        { product_id: 15, user_id: 2 },
        { product_id: 16, user_id: 2 },
        { product_id: 17, user_id: 2 },
        { product_id: 18, user_id: 2 },
        { product_id: 19, user_id: 2 },
        { product_id: 20, user_id: 2 }
      ]);
    });
};
