exports.up = (knex) =>
  knex.schema.createTable('producers', (table) => {
    table.increments().primary().index();
    table.string('cpf').unique().defaultTo(null);
    table.string('cnpj').unique().defaultTo(null);
    table.string('name').defaultTo(null);
    table.string('whatsapp').defaultTo(null);
    // endereço do produtor
    table.string('address').defaultTo(null);
    // inscrição municipal e inscrição estadual
    table.string('ie').defaultTo(null);
    table.string('im').defaultTo(null);
    table.string('hash').defaultTo(null);
    table.string('upserter').defaultTo(null);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producers');
