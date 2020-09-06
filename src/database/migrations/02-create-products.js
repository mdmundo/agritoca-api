exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments().primary().index();
    table.string('NCM').unique().notNullable();
    // a gramatura, medida.
    table.string('measure').notNullable();
    table.binary('picture');
    table.string('description');
    table.boolean('isOrganic');
    // the inserter or the updater of this register
    table.string('upserter').notNullable().defaultTo('anonymous');
    table.timestamps();
  });

exports.down = (knex) => knex.schema.dropTableIfExists('products');
