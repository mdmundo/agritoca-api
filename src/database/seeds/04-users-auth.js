exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users_auth')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users_auth').insert([
        {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI4M2NmZmQ3LWNjYTMtNGNlMy1hZWM0LTIyNTg3NWQxMjA2Zl8iLCJpYXQiOjE1OTc3ODk1ODB9.T6UN21tNfA5JQOCKdVU5mbseywZdq2ISqBIuUthDxx4',
          user_id: 1
        }
      ]);
    });
};
