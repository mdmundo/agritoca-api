exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('products').insert([
        {
          NCM: 7384,
          measure: 'm2',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 6022,
          measure: 'cm2',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 6949,
          measure: 'm',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 9473,
          measure: 'cm',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 8857,
          measure: 'UN',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 5474,
          measure: 'CT',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 7432,
          measure: 'CX',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 3592,
          measure: 'DZ',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 7927,
          measure: 'GS',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 3555,
          measure: 'PA',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 2822,
          measure: 'PÇ',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 8663,
          measure: 'PR',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 1394,
          measure: 'PT',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 1661,
          measure: 'RL',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 8209,
          measure: 'kg',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 1964,
          measure: 'g',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 6552,
          measure: 'SC60',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 5714,
          measure: 'l',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 6120,
          measure: 'm3',
          description: 'a nice product description',
          isOrganic: false
        },
        {
          NCM: 2914,
          measure: 'ml',
          description: 'a nice product description',
          isOrganic: false
        }
      ]);
    });
};
