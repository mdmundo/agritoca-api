exports.up = (knex) =>
  knex.schema.createTable('baskets', (table) => {
    table.increments().primary().index();
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE')
      .defaultTo(null);
    table.string('name').defaultTo(null);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('baskets');
