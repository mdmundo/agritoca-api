exports.up = (knex) =>
  knex.schema.createTable('producer_products', (table) => {
    table.increments().primary().index();
    table
      .integer('product_id')
      .references('id')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .defaultTo(null);
    table
      .integer('producer_id')
      .references('id')
      .inTable('producers')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .defaultTo(null);
    // if (!picture) fallback to product picture
    table.binary('picture').defaultTo(null);
    table.string('brand').defaultTo(null);
    table.string('barcode').defaultTo(null);
    table.string('keywords').defaultTo(null);
    table.string('upserter').defaultTo(null);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producer_products');
