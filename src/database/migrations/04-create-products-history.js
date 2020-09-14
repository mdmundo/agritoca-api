exports.up = (knex) =>
  knex.schema.createTable('products_history', (table) => {
    table.increments().primary().index();
    table.integer('product_id').notNullable();
    table.string('ncm');
    table.string('measure');
    table.binary('picture');
    table.string('description');
    table.boolean('is_organic');
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('products_history');
