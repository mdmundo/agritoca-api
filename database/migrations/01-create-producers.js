exports.up = (knex) =>
  knex.schema.createTable('producers', (table) => {
    table.increments().primary().index();
    table.string('cpf').unique().defaultTo('No cpf provided');
    table.string('cnpj').unique().defaultTo('No cnpj provided');
    table.string('name').defaultTo('Anonymous');
    table.string('whatsapp').defaultTo('No whatsapp provided');
    table.string('address').defaultTo('No address provided');
    table.string('ie').defaultTo('No ie provided');
    table.string('im').defaultTo('No im provided');
    table.string('hash').index().defaultTo('No hash');
    table.string('mod').defaultTo(null);
    table.string('admin').defaultTo(null);
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producers');
