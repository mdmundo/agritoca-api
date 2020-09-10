exports.up = (knex) =>
  knex.schema.createTable('products_backup', (table) => {
    table.increments().primary().index();
    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION');
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('products_backup');
