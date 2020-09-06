exports.up = (knex) =>
  knex.schema.createTable('products', (table) => {
    table.increments().primary().index();
    table.string('ncm').unique().notNullable();
    // a gramatura, medida.
    table.string('measure').notNullable();
    table.binary('picture');
    table.string('description');
    table.boolean('is_organic');
    // the inserter or the updater of this register
    table.string('upserter').notNullable().defaultTo('anonymous');
    table.timestamps(true, true);
  });

exports.down = (knex) => knex.schema.dropTableIfExists('products');
