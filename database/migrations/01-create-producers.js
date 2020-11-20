exports.up = (knex) =>
  knex.schema.createTable('producers', (table) => {
    table.increments().primary().index();
    table.string('cpf').unique().defaultTo(null);
    table.string('cnpj').unique().defaultTo(null);
    table.string('name').defaultTo(null);
    table.string('whatsapp').defaultTo(null);
    table.string('address').defaultTo(null);
    table.string('ie').defaultTo(null);
    table.string('im').defaultTo(null);
    table.string('hash').index().defaultTo(null);
    table.string('mod').defaultTo(null);
    table.string('owner').defaultTo(null);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producers');
