const picture = require('./picture');

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('producer_products')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('producer_products').insert([
        {
          brand: 'Raios de Sol',
          barcode: '197895997244',
          keywords: 'Ovo, Granja, Caipira',
          picture: picture.egg,
          product_id: 1,
          producer_id: 1,
          info: 'None',
          mod: 'manyymoore@gmail.com'
        },
        {
          brand: 'Horta Feliz',
          barcode: '382206162564',
          keywords: 'Comestível, Saudável, Vegetariano',
          picture: picture.lettuce,
          product_id: 2,
          producer_id: 1,
          info: 'None',
          mod: 'manyymoore@gmail.com'
        },
        {
          brand: 'Ovo mas não volto',
          barcode: '878475019421',
          keywords: 'Caipira, Galinha, Frango, Hormônio',
          product_id: 1,
          producer_id: 2,
          info: 'None',
          mod: 'manyymoore@gmail.com'
        },
        {
          brand: 'Hortalizas',
          barcode: '181580849422',
          keywords: 'Verde, Comestível, Hormônio',
          product_id: 2,
          producer_id: 2,
          info: 'None',
          mod: 'manyymoore@gmail.com'
        },
        {
          brand: 'IN NATURA',
          barcode: '718216287996',
          keywords: 'Maçã, Americana, Peru, Verde',
          picture: picture.apple,
          product_id: 9,
          producer_id: 1,
          info: 'None',
          mod: 'manyymoore@gmail.com'
        },
        {
          brand: 'IN NATURA',
          barcode: '405232088822',
          keywords: 'Banana, Prata, Terra',
          picture: picture.banana,
          product_id: 10,
          producer_id: 1,
          info: 'None',
          mod: 'manyymoore@gmail.com'
        }
      ]);
    });
};
