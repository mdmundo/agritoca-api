const knex = require('../connection');

(async () => {
  // get the user from DB_URL
  const user = process.env.DB_URL.replace('postgres://', '').split(':')[0];
  await knex.schema.raw(`DROP OWNED BY ${user} CASCADE;`);

  console.log('^C to stop');
})();
