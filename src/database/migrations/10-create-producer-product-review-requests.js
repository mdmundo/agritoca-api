exports.up = (knex) =>
  knex.schema.createTable('producer_product_review_requests', (table) => {
    table.increments().primary().index();
    table
      .integer('producer_product_id')
      .defaultTo(null)
      .references('id')
      .inTable('producer_products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('product_id')
      .defaultTo(null)
      .references('id')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('producer_id')
      .defaultTo(null)
      .references('id')
      .inTable('producers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('brand');
    table.string('barcode');
    table.string('keywords');
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) =>
  knex.schema.dropTableIfExists('producer_product_review_requests');
