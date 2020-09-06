exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments().primary();
    table.string('name').notNullable();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('products');
