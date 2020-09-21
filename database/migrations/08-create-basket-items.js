exports.up = (knex) =>
  knex.schema.createTable('basket_items', (table) => {
    table.increments().primary().index();
    table
      .integer('basket_id')
      .notNullable()
      .references('id')
      .inTable('baskets')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table
      .integer('producer_product_id')
      .notNullable()
      .references('id')
      .inTable('producer_products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('basket_items');
