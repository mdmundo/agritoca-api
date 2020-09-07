exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments().primary().index();
    table.string('email').unique().notNullable();
    table.string('password').defaultTo(null);
    // check if the user is an admin
    table.boolean('is_admin').notNullable().defaultTo(false);
    // check if the user is a moderator
    table.boolean('is_mod').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users');
