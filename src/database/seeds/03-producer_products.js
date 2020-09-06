exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('producer_products')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('producer_products').insert([
        {
          brand: 'ooarea',
          barcode: '197895997244',
          keywords: 'upset, responsible, splendid',
          product_id: 1,
          producer_id: 1
        },
        {
          brand: 'professionalsi',
          barcode: '382206162564',
          keywords: 'snobbish, divergent, incompetent',
          product_id: 2,
          producer_id: 1
        },
        {
          brand: 'allaboutanimation',
          barcode: '878475019421',
          keywords: 'nice, instinctive, immediate',
          product_id: 3,
          producer_id: 1
        },
        {
          brand: 'montrealwines',
          barcode: '181580849422',
          keywords: 'feigned, fixed, nine',
          product_id: 4,
          producer_id: 1
        },
        {
          brand: 'seomovement',
          barcode: '605696256739',
          keywords: 'phobic, scattered, witty',
          product_id: 5,
          producer_id: 1
        },
        {
          brand: 'printsbook',
          barcode: '728611819467',
          keywords: 'gentle, male, evasive',
          product_id: 6,
          producer_id: 1
        },
        {
          brand: 'sageinsider',
          barcode: '227318346103',
          keywords: 'broad, psychedelic, kaput',
          product_id: 7,
          producer_id: 1
        },
        {
          brand: 'howtopilot',
          barcode: '036316781578',
          keywords: 'strange, resolute, capable',
          product_id: 8,
          producer_id: 1
        },
        {
          brand: 'betteran',
          barcode: '618963774621',
          keywords: 'bizarre, gorgeous, white',
          product_id: 9,
          producer_id: 1
        },
        {
          brand: 'empirelabels',
          barcode: '543585956648',
          keywords: 'smooth, joyous, busy',
          product_id: 10,
          producer_id: 1
        },
        {
          brand: 'amberschool',
          barcode: '767587167583',
          keywords: 'unusual, hurt, psychedelic',
          product_id: 1,
          producer_id: 1
        },
        {
          brand: 'mountainequipment',
          barcode: '515584658057',
          keywords: 'temporary, unbiased, enchanted',
          product_id: 1,
          producer_id: 2
        },
        {
          brand: 'leanhacker',
          barcode: '726783871151',
          keywords: 'guarded, careless, absorbing',
          product_id: 1,
          producer_id: 3
        },
        {
          brand: 'slowclub',
          barcode: '378311803612',
          keywords: 'available, able, handsomely',
          product_id: 1,
          producer_id: 4
        },
        {
          brand: 'apluspartners',
          barcode: '153993027071',
          keywords: 'broken, obviously, premium',
          product_id: 1,
          producer_id: 5
        },
        {
          brand: 'basicec',
          barcode: '716789776527',
          keywords: 'auspicious, closed, incandescent',
          product_id: 1,
          producer_id: 6
        },
        {
          brand: 'eliterun',
          barcode: '643219862270',
          keywords: 'alleged, yielding, annoyed',
          product_id: 1,
          producer_id: 7
        },
        {
          brand: 'platinumbear',
          barcode: '505854275106',
          keywords: 'complex, chief, visible',
          product_id: 1,
          producer_id: 8
        },
        {
          brand: 'techsteel',
          barcode: '129601282313',
          keywords: 'bite-sized, cluttered, harsh',
          product_id: 1,
          producer_id: 9
        },
        {
          brand: 'opticell',
          barcode: '130194962380',
          keywords: 'lively, delicate, threatening',
          product_id: 1,
          producer_id: 10
        }
      ]);
    });
};
