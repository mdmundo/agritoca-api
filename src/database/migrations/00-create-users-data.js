exports.up = (knex) =>
  knex.schema.createTable('users_data', (table) => {
    table.increments().primary();
    table.string('name').notNullable();
    table.string('email').unique().notNullable();
    table.string('password');
    table.string('picture');
    table.timestamp('birth_date', { useTz: false });
    table.string('cpf');
  });

exports.down = (knex) => knex.schema.dropTableIfExists('users_data');
