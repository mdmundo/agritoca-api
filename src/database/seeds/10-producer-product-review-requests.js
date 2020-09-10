exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('producer_product_review_requests')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('producer_product_review_requests').insert([
        {
          brand: 'Marvel E',
          barcode: '657236480219',
          keywords: 'upset, tan, splendid',
          product_id: 1,
          producer_id: 1,
          upserter: 'heckerman@aol.com'
        },
        {
          brand: 'Objective E',
          barcode: '761424633706',
          keywords: 'snobbish, needy, incompetent',
          product_id: 2,
          producer_id: 1,
          upserter: 'heckerman@aol.com'
        },
        {
          brand: 'Seed E',
          barcode: '655427289836',
          keywords: 'nice, former, immediate',
          product_id: 3,
          producer_id: 1,
          upserter: 'heckerman@aol.com'
        },
        {
          brand: 'Allied E',
          barcode: '314556271689',
          keywords: 'feigned, mundane, nine',
          product_id: 4,
          producer_id: 1,
          upserter: 'heckerman@aol.com'
        },
        {
          brand: 'Bareback E',
          barcode: '034787900216',
          keywords: 'phobic, alive, witty',
          product_id: 5,
          producer_id: 1,
          upserter: 'heckerman@aol.com'
        },
        {
          brand: 'Rail E',
          barcode: '277646639694',
          keywords: 'gentle, dysfunctional, evasive',
          product_id: 6,
          producer_id: 1,
          upserter: 'heckerman@aol.com'
        },
        {
          brand: 'Spectator E',
          barcode: '074883903007',
          keywords: 'broad, puzzled, kaput',
          product_id: 7,
          producer_id: 1,
          upserter: 'heckerman@aol.com'
        },
        {
          brand: 'Prana E',
          barcode: '484274967753',
          keywords: 'strange, gratis, capable',
          product_id: 8,
          producer_id: 1,
          upserter: 'heckerman@aol.com'
        },
        {
          brand: 'Dimension A',
          barcode: '913713250081',
          keywords: 'bizarre, hissing, white',
          product_id: 9,
          producer_id: 1,
          upserter: 'heckerman@aol.com'
        },
        {
          brand: 'Lift B',
          barcode: '760208045697',
          keywords: 'smooth, heavenly, busy',
          product_id: 10,
          producer_id: 1,
          upserter: 'heckerman@aol.com'
        },
        {
          producer_product_id: 11,
          brand: 'Forge A',
          barcode: '830643189834',
          keywords: 'unusual, spiritual, psychedelic',
          product_id: 1,
          producer_id: 1,
          upserter: 'heckerman@aol.com'
        },
        {
          producer_product_id: 12,
          brand: 'Advisor A',
          barcode: '227690654730',
          keywords: 'temporary, vengeful, enchanted',
          product_id: 1,
          producer_id: 2,
          upserter: 'heckerman@aol.com'
        },
        {
          producer_product_id: 13,
          brand: 'Realtor E',
          barcode: '002954666676',
          keywords: 'guarded, dull, absorbing',
          product_id: 1,
          producer_id: 3,
          upserter: 'heckerman@aol.com'
        },
        {
          producer_product_id: 14,
          brand: 'Energise A',
          barcode: '843373254585',
          keywords: 'available, impolite, handsomely',
          product_id: 1,
          producer_id: 4,
          upserter: 'heckerman@aol.com'
        },
        {
          producer_product_id: 15,
          brand: 'Canister B',
          barcode: '742994422902',
          keywords: 'broken, illustrious, premium',
          product_id: 1,
          producer_id: 5,
          upserter: 'heckerman@aol.com'
        },
        {
          producer_product_id: 16,
          brand: 'Nimble B',
          barcode: '366278107888',
          keywords: 'auspicious, careless, incandescent',
          product_id: 1,
          producer_id: 6,
          upserter: 'heckerman@aol.com'
        },
        {
          producer_product_id: 17,
          brand: 'Feast E',
          barcode: '327175547570',
          keywords: 'alleged, ill, annoyed',
          product_id: 1,
          producer_id: 7,
          upserter: 'heckerman@aol.com'
        },
        {
          producer_product_id: 18,
          brand: 'Faith E',
          barcode: '946995350735',
          keywords: 'complex, aberrant, visible',
          product_id: 1,
          producer_id: 8,
          upserter: 'heckerman@aol.com'
        },
        {
          producer_product_id: 19,
          brand: 'Original A',
          barcode: '748302340076',
          keywords: 'bite-sized, furry, harsh',
          product_id: 1,
          producer_id: 9,
          upserter: 'heckerman@aol.com'
        },
        {
          producer_product_id: 20,
          brand: 'Ori B',
          barcode: '510053129616',
          keywords: 'lively, productive, threatening',
          product_id: 1,
          producer_id: 10,
          upserter: 'heckerman@aol.com'
        }
      ]);
    });
};
