exports.up = (knex) =>
  knex.schema.createTable('users_products', (table) => {
    table.increments().primary();

    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users_data')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users_products');
