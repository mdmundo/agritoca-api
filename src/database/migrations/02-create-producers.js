exports.up = (knex) =>
  knex.schema.createTable('producers', (table) => {
    table.increments().primary().index();
    table
      .integer('history_id')
      .notNullable()
      .references('id')
      .inTable('producers_history')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
    table.string('cpf').unique().notNullable();
    table.string('cnpj').unique();
    table.string('name').notNullable();
    table.string('whatsapp');
    // endereço do produtor
    table.string('address');
    // inscrição municipal e inscrição estadual
    table.string('ie');
    table.string('im');
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producers');
