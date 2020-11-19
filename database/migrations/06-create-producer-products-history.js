exports.up = (knex) =>
  knex.schema.createTable('producer_products_history', (table) => {
    table.increments().primary().index();
    table.integer('producer_product_id').index().defaultTo(null);
    table.integer('product_id').index().defaultTo(null);
    table.integer('producer_id').index().defaultTo(null);
    table.binary('picture').defaultTo(null);
    table.string('brand').defaultTo(null);
    table.string('barcode').defaultTo(null);
    table.string('keywords').defaultTo(null);
    table.string('mod').defaultTo(null);
    table.string('admin').defaultTo(null);
    table.timestamps(true, true);
    table.timestamp('deleted_at').defaultTo(null);
  });

exports.down = (knex) =>
  knex.schema.dropTableIfExists('producer_products_history');
