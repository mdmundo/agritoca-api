exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Edmundo',
          email: 'manyymoore@gmail.com',
          privilege: 2
        },
        {
          name: 'James',
          email: 'james@example.com',
          privilege: 1
        },
        {
          name: 'Stewart',
          email: 'stewart@example.com'
        },
        {
          name: 'Calebe',
          email: 'cahoam@gmail.com',
          privilege: 2
        },
        {
          name: 'EDMUNDO',
          email: 'edmundo.paulino@mail.uft.edu.br',
          privilege: 2
        }
      ]);
    });
};
