exports.up = (knex) =>
  knex.schema.createTable('producers_history', (table) => {
    table.increments().primary().index();
    table.integer('producer_id').notNullable();
    table.string('cpf').defaultTo(null);
    table.string('cnpj').defaultTo(null);
    table.string('name').defaultTo(null);
    table.string('whatsapp').defaultTo(null);
    // endereço do produtor
    table.string('address').defaultTo(null);
    // inscrição municipal e inscrição estadual
    table.string('ie').defaultTo(null);
    table.string('im').defaultTo(null);
    table.string('hash').defaultTo(null);
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producers_history');
