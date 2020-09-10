exports.up = (knex) =>
  knex.schema.createTable('producer_product_review_requests', (table) => {
    table.increments().primary().index();
    table
      .integer('product_id')
      .notNullable()
      .references('id')
      .inTable('products')
      .onUpdate('NO ACTION')
      .onDelete('NO ACTION');
    table.string('ncm');
    table.string('measure');
    table.binary('picture');
    table.string('description');
    table.boolean('is_organic');
    table.string('upserter');
    table.timestamps(true, true);
  });

exports.down = (knex) =>
  knex.schema.dropTableIfExists('producer_product_review_requests');
