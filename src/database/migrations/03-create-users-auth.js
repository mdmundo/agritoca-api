exports.up = (knex) =>
  knex.schema.createTable('users_auth', (table) => {
    table.string('token').notNullable();
    table.string('google_token');
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users_data')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users_auth');
