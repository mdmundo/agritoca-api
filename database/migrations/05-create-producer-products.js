exports.up = (knex) =>
  knex.schema.createTable('producer_products', (table) => {
    table.increments().primary().index();
    // Important!!! RESTRICT option onUpdate, onDelete
    table
      .integer('product_id')
      .index()
      .notNullable()
      .references('id')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    table
      .integer('producer_id')
      .index()
      .notNullable()
      .references('id')
      .inTable('producers')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    // if (!picture) fallback to product picture
    table.binary('picture').defaultTo(null);
    table.string('brand').defaultTo(null);
    table.string('barcode').defaultTo(null);
    table.string('keywords').defaultTo(null);
    table.string('info').defaultTo(null);
    table.string('mod').defaultTo(null);
    table.string('owner').defaultTo(null);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producer_products');
