exports.up = (knex) =>
  knex.schema.createTable('producers_backup', (table) => {
    table.increments().primary().index();
    table
      .integer('producer_id')
      .notNullable()
      .references('id')
      .inTable('producers')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION');
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('producers_backup');
