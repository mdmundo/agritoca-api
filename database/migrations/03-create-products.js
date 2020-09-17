exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments().primary().index();
    table.string('ncm').unique().notNullable();
    // a gramatura, medida.
    table.string('measure').notNullable();
    // if (!picture) fallback to /products/picture.png
    table.binary('picture');
    table.string('description');
    table.boolean('is_organic');
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('products');
