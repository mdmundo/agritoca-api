const picture = require('./picture');

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('products').insert([
        {
          ncm: '04072100',
          measure: 'DUZIA',
          description: 'Ovos de Aves, da Espécie Gallus Domesticus, Frescos',
          picture: picture.egg,
          is_organic: false,
          mod: 'manyymoore@gmail.com'
        },
        {
          ncm: '07051100',
          measure: 'KG',
          description: 'Alface Repolhuda, Fresca ou Refrigerada',
          picture: picture.lettuce,
          is_organic: true,
          mod: 'manyymoore@gmail.com'
        },
        {
          ncm: '07061000',
          measure: 'KG',
          description: 'Cenouras e Nabos, Frescos ou Refrigerados',
          picture: picture.carrot,
          is_organic: true,
          mod: 'manyymoore@gmail.com'
        },
        {
          ncm: '21069050',
          measure: 'KG',
          description: 'Gomas de Mascar, Sem Açúcar',
          picture: picture.sugar,
          is_organic: false,
          mod: 'manyymoore@gmail.com'
        },
        {
          ncm: '22030000',
          measure: 'LT',
          description: 'Cerveja de Malte',
          picture: picture.beer,
          is_organic: false,
          mod: 'manyymoore@gmail.com'
        },
        {
          ncm: '22082000',
          measure: 'LT',
          description: 'Aguardentes de Vinho ou de Bagaço de Uvas',
          is_organic: false,
          mod: 'manyymoore@gmail.com'
        },
        {
          ncm: '22084000',
          measure: 'LT',
          description: 'Rum e Outras Aguardentes de Cana',
          picture: picture.alcohol,
          is_organic: false,
          mod: 'manyymoore@gmail.com'
        },
        {
          ncm: '22089000',
          measure: 'LT',
          description: 'Outras Bebidas Espirituosas (Alcoólicas)',
          picture: picture.alcohol,
          is_organic: false,
          mod: 'manyymoore@gmail.com'
        },
        {
          ncm: '08081000',
          measure: 'KG',
          description: 'Maçãs Frescas',
          picture: picture.apple,
          is_organic: true,
          mod: 'manyymoore@gmail.com'
        },
        {
          ncm: '08039000',
          measure: 'KG',
          description: 'Outras Bananas Frescas ou Secas',
          picture: picture.banana,
          is_organic: true,
          mod: 'manyymoore@gmail.com'
        }
      ]);
    });
};
