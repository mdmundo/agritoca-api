exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments().primary().index();
    table.string('ncm').unique().index().defaultTo('No ncm provided');
    table.string('measure').defaultTo('No measure provided');
    table.binary('picture').defaultTo(null);
    table.string('description').defaultTo('No description provided');
    table.boolean('is_organic').defaultTo(false);
    table.string('mod').defaultTo(null);
    table.string('admin').defaultTo(null);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('products');
