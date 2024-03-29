exports.up = (knex) =>
  knex.schema.createTable('baskets', (table) => {
    table.increments().primary().index();
    table
      .integer('user_id')
      .index()
      .unique()
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.text('user_baskets');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('baskets');
