exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments().primary().index();
    table.string('ncm').index().defaultTo(null);
    table.string('measure').defaultTo(null);
    table.binary('picture').defaultTo(null);
    table.string('description').defaultTo(null);
    table.boolean('is_organic').defaultTo(false);
    table.string('mod').defaultTo(null);
    table.string('owner').defaultTo(null);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('products');
