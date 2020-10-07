exports.up = (knex) =>
  knex.schema.createTable('baskets', (table) => {
    table.increments().primary().index();
    table
      .integer('user_id')
      .unique()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.json('user_baskets');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('baskets');
