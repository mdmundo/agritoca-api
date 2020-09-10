exports.up = (knex) =>
  knex.schema.createTable('baskets', (table) => {
    table.increments().primary().index();

    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.string('name').defaultTo('Cesta');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('baskets');
