const picture = require('./img/product');

exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('producer_products')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('producer_products').insert([
        {
          brand: 'ooarea',
          barcode: '197895997244',
          keywords: 'upset, responsible, splendid',
          picture,
          product_id: 1,
          producer_id: 1,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'professionalsi',
          barcode: '382206162564',
          keywords: 'snobbish, divergent, incompetent',
          product_id: 2,
          producer_id: 1,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'allaboutanimation',
          barcode: '878475019421',
          keywords: 'nice, instinctive, immediate',
          product_id: 3,
          producer_id: 1,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'montrealwines',
          barcode: '181580849422',
          keywords: 'feigned, fixed, nine',
          product_id: 4,
          producer_id: 1,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'seomovement',
          barcode: '605696256739',
          keywords: 'phobic, scattered, witty',
          product_id: 5,
          producer_id: 1,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'printsbook',
          barcode: '728611819467',
          keywords: 'gentle, male, evasive',
          product_id: 6,
          producer_id: 1,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'sageinsider',
          barcode: '227318346103',
          keywords: 'broad, psychedelic, kaput',
          product_id: 7,
          producer_id: 1,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'howtopilot',
          barcode: '036316781578',
          keywords: 'strange, resolute, capable',
          product_id: 8,
          producer_id: 1,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'betteran',
          barcode: '618963774621',
          keywords: 'bizarre, gorgeous, white',
          product_id: 9,
          producer_id: 1,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'empirelabels',
          barcode: '543585956648',
          keywords: 'smooth, joyous, busy',
          product_id: 10,
          producer_id: 1,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'amberschool',
          barcode: '767587167583',
          keywords: 'unusual, hurt, psychedelic',
          product_id: 1,
          producer_id: 1,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'mountainequipment',
          barcode: '515584658057',
          keywords: 'temporary, unbiased, enchanted',
          product_id: 1,
          producer_id: 2,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'leanhacker',
          barcode: '726783871151',
          keywords: 'guarded, careless, absorbing',
          product_id: 1,
          producer_id: 3,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'slowclub',
          barcode: '378311803612',
          keywords: 'available, able, handsomely',
          product_id: 1,
          producer_id: 4,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'apluspartners',
          barcode: '153993027071',
          keywords: 'broken, obviously, premium',
          product_id: 1,
          producer_id: 5,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'basicec',
          barcode: '716789776527',
          keywords: 'auspicious, closed, incandescent',
          product_id: 1,
          producer_id: 6,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'eliterun',
          barcode: '643219862270',
          keywords: 'alleged, yielding, annoyed',
          product_id: 1,
          producer_id: 7,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'platinumbear',
          barcode: '505854275106',
          keywords: 'complex, chief, visible',
          product_id: 1,
          producer_id: 8,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'techsteel',
          barcode: '129601282313',
          keywords: 'bite-sized, cluttered, harsh',
          product_id: 1,
          producer_id: 9,
          mod: 'mbrown@msn.com'
        },
        {
          brand: 'opticell',
          barcode: '130194962380',
          keywords: 'lively, delicate, threatening',
          product_id: 1,
          producer_id: 10,
          mod: 'mbrown@msn.com'
        }
      ]);
    });
};
