exports.up = (knex) =>
  knex.schema.createTable('producer_products_history', (table) => {
    table.increments().primary().index();
    table.integer('producer_product_id').notNullable();
    table.integer('product_id').notNullable();
    table.integer('producer_id').notNullable();
    table.string('brand');
    table.string('barcode');
    table.string('keywords');
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) =>
  knex.schema.dropTableIfExists('producer_products_history');
