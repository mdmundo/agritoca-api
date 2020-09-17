exports.up = (knex) =>
  knex.schema.createTable('producer_products_history', (table) => {
    table.increments().primary().index();
    table.integer('producer_product_id').notNullable();
    table.integer('product_id').notNullable();
    table.integer('producer_id').notNullable();
    table.binary('picture');
    table.string('brand').defaultTo(null);
    table.string('barcode').defaultTo(null);
    table.string('keywords').defaultTo(null);
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) =>
  knex.schema.dropTableIfExists('producer_products_history');
