exports.up = (knex) =>
  knex.schema.createTable('users_auth', (table) => {
    table.string('token').notNullable();
    table.string('google_token');
    // foreign keys from users
    table
      .integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users_auth');
