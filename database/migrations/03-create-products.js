exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments().primary().index();
    table.string('ncm').unique().defaultTo(null);
    // a gramatura, medida.
    table.string('measure').defaultTo(null);
    // if (!picture) fallback to /products/picture.png
    table.binary('picture').defaultTo(null);
    table.string('description').defaultTo(null);
    table.boolean('is_organic').defaultTo(null);
    table.string('upserter').defaultTo(null);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('products');
