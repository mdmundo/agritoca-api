exports.up = (knex) =>
  knex.schema.createTable('producer_review_requests', (table) => {
    table.increments().primary().index();
    table
      .integer('producer_id')
      .notNullable()
      .references('id')
      .inTable('producers')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION');
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

exports.down = (knex) =>
  knex.schema.dropTableIfExists('producer_review_requests');
