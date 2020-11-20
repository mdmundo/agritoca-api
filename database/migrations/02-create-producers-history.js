exports.up = (knex) =>
  knex.schema.createTable('producers_history', (table) => {
    table.increments().primary().index();
    table.integer('producer_id').index().defaultTo(null);
    table.string('cpf').defaultTo(null);
    table.string('cnpj').defaultTo(null);
    table.string('name').defaultTo(null);
    table.string('whatsapp').defaultTo(null);
    table.string('address').defaultTo(null);
    table.string('ie').defaultTo(null);
    table.string('im').defaultTo(null);
    table.string('hash').index().defaultTo(null);
    table.string('mod').defaultTo(null);
    table.string('owner').defaultTo(null);
    table.timestamps(true, true);
    table.timestamp('deleted_at').defaultTo(null);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producers_history');
