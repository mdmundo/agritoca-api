exports.up = (knex) =>
  knex.schema.createTable('producer_products_history', (table) => {
    table.increments().primary().index();
    table
      .integer('producer_products_id')
      .notNullable()
      .references('id')
      .inTable('producer_products')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION');

    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) =>
  knex.schema.dropTableIfExists('producer_products_history');
