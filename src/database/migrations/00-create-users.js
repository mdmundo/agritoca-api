exports.up = (knex) =>
  knex.schema.createTable('users', (table) => {
    table.increments().primary().index();
    table.string('name').defaultTo('anonymous');
    table.string('email').unique().defaultTo(null);
    table.string('picture').defaultTo(null);
    // user is an admin === 2 or moderator === 1;
    // otherwise, the user is regular === 0
    table.integer('privilege').notNullable().defaultTo(0);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users');
