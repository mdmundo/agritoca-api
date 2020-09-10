exports.up = (knex) =>
  knex.schema.createTable('products_history', (table) => {
    table.increments().primary().index();
    table
      .integer('products_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION');
    table.string('ncm');
    table.string('measure');
    table.binary('picture');
    table.string('description');
    table.boolean('is_organic');
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('products_history');
