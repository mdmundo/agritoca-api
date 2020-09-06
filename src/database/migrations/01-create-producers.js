exports.up = (knex) =>
  knex.schema.createTable('producers', (table) => {
    table.increments().primary().index();
    table.string('cpf').unique().notNullable();
    table.string('cnpj').unique();
    table.string('name').notNullable();
    table.string('whatsapp');
    // endereço do produtor
    table.string('address');
    // inscrição municipal e inscrição estadual
    table.string('ie');
    table.string('im');
    // the inserter or the updater of this register
    table.string('upserter').notNullable().defaultTo('anonymous');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producers');
