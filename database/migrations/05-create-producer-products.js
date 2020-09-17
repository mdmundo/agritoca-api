exports.up = (knex) =>
  knex.schema.createTable('producer_products', (table) => {
    table.increments().primary().index();
    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('producer_id')
      .notNullable()
      .references('id')
      .inTable('producers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    // if (!picture) fallback to product picture
    table.binary('picture');
    table.string('brand');
    table.string('barcode');
    table.string('keywords');
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producer_products');
