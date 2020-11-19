exports.up = (knex) =>
  knex.schema.createTable('products_history', (table) => {
    table.increments().primary().index();
    table.integer('product_id').index().defaultTo(null);
    table.string('ncm').index().defaultTo(null);
    table.string('measure').defaultTo(null);
    table.binary('picture').defaultTo(null);
    table.string('description').defaultTo(null);
    table.boolean('is_organic').defaultTo(null);
    table.string('mod').defaultTo(null);
    table.string('admin').defaultTo(null);
    table.timestamps(true, true);
    table.timestamp('deleted_at').defaultTo(null);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('products_history');
