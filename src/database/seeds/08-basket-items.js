exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('basket_items')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('basket_items').insert([
        { basket_id: 1, producer_product_id: 1 },
        { basket_id: 1, producer_product_id: 2 },
        { basket_id: 1, producer_product_id: 3 },
        { basket_id: 1, producer_product_id: 4 },
        { basket_id: 1, producer_product_id: 5 },
        { basket_id: 1, producer_product_id: 6 },
        { basket_id: 1, producer_product_id: 7 },
        { basket_id: 1, producer_product_id: 8 },
        { basket_id: 1, producer_product_id: 9 },
        { basket_id: 1, producer_product_id: 10 },
        { basket_id: 1, producer_product_id: 11 },
        { basket_id: 2, producer_product_id: 12 },
        { basket_id: 3, producer_product_id: 13 },
        { basket_id: 4, producer_product_id: 14 },
        { basket_id: 5, producer_product_id: 15 },
        { basket_id: 6, producer_product_id: 16 },
        { basket_id: 7, producer_product_id: 17 },
        { basket_id: 8, producer_product_id: 18 },
        { basket_id: 9, producer_product_id: 19 },
        { basket_id: 10, producer_product_id: 20 }
      ]);
    });
};
