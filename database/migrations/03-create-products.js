exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments().primary().index();
    table.string('ncm').unique().defaultTo('No ncm provided');
    // a gramatura, medida.
    table.string('measure').defaultTo('No measure provided');
    // if (!picture) fallback to /products/picture.png
    table.binary('picture').defaultTo(null);
    table.string('description').defaultTo('No description provided');
    table.boolean('is_organic').defaultTo(false);
    table.string('upserter').defaultTo('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('products');
