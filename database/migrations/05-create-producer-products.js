exports.up = (knex) =>
  knex.schema.createTable('producer_products', (table) => {
    table.increments().primary().index();
    // Important!!! RESTRICT option onUpdate, onDelete
    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    table
      .integer('producer_id')
      .notNullable()
      .references('id')
      .inTable('producers')
      .onUpdate('CASCADE')
      .onDelete('RESTRICT');
    // if (!picture) fallback to product picture
    table.binary('picture').defaultTo(null);
    table.string('brand').defaultTo('No brand provided');
    table.string('barcode').defaultTo('No barcode provided');
    table.string('keywords').defaultTo('No keywords provided');
    table.string('mod').defaultTo('mod');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producer_products');
