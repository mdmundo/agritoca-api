exports.up = (knex) =>
  knex.schema.createTable('producers_history', (table) => {
    table.increments().primary().index();
    table.string('cpf');
    table.string('cnpj');
    table.string('name');
    table.string('whatsapp');
    // endereço do produtor
    table.string('address');
    // inscrição municipal e inscrição estadual
    table.string('ie');
    table.string('im');
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producers_history');
