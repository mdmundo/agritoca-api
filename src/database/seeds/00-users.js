exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          email: 'teverett@msn.com',
          is_admin: true
        },
        {
          email: 'mbrown@msn.com',
          is_mod: true
        },
        {
          email: 'tattooman@me.com'
        },
        {
          email: 'mbswan@me.com'
        },
        {
          email: 'ardagna@aol.com'
        },
        {
          email: 'malin@live.com'
        },
        {
          email: 'magusnet@sbcglobal.net'
        },
        {
          email: 'phish@optonline.net'
        },
        {
          email: 'rmcfarla@yahoo.ca'
        },
        {
          email: 'greear@live.com'
        },
        {
          email: 'errxn@comcast.net'
        },
        {
          email: 'jugalator@icloud.com'
        },
        {
          email: 'qrczak@outlook.com'
        },
        {
          email: 'jramio@outlook.com'
        },
        {
          email: 'catalog@sbcglobal.net'
        },
        {
          email: 'dhrakar@yahoo.ca'
        },
        {
          email: 'shaffei@mac.com'
        },
        {
          email: 'parrt@live.com'
        },
        {
          email: 'keijser@gmail.com'
        }
      ]);
    });
};
