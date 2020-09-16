const user = process.env.DB_URL.replace('postgres://', '').split(':')[0];

exports.seed = (knex) => {
  return knex.schema.raw(`DROP OWNED BY ${user} CASCADE;`);
};
