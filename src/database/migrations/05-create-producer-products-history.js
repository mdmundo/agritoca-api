exports.up = (knex) =>
  knex.schema.createTable('producer_products_history', (table) => {
    table.increments().primary().index();
    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION');
    table
      .integer('producer_id')
      .notNullable()
      .references('id')
      .inTable('producers')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION');
    table.string('brand');
    table.string('barcode');
    table.string('keywords');
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) =>
  knex.schema.dropTableIfExists('producer_products_history');
