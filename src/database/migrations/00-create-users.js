exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments().primary().index();
    table.string('email').unique().notNullable();
    table.string('password');
    // check if the user is an admin
    table.boolean('isAdmin').notNullable().defaultTo(false);
    // check if the user is a moderator
    table.boolean('isMod').notNullable().defaultTo(false);
    // the inserter or the updater of this register
    table.string('upserter').notNullable().defaultTo('anonymous');
    table.timestamps();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users');
