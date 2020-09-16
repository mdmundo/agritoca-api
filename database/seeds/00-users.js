exports.seed = (knex) => {
  // Deletes ALL existing entries
  return knex('users')
    .del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert([
        {
          name: 'Edmundo',
          email: 'teverett@msn.com',
          picture:
            'https://s.gravatar.com/avatar/f573cc50e19283110a74db7f4a8bafb8?s=96&d=retro',
          privilege: 2
        },
        {
          name: 'James',
          email: 'mbrown@msn.com',
          picture:
            'https://s.gravatar.com/avatar/9418cf81ace4c8a471af4172001cc958?s=96&d=retro',
          privilege: 1
        },
        {
          name: 'Stewart',
          email: 'heckerman@aol.com',
          picture:
            'https://s.gravatar.com/avatar/440c551982b4d71250bb1eed6324836f?s=96&d=retro'
        },
        {
          name: 'Luís',
          email: 'manyymoore@gmail.com',
          picture:
            'https://s.gravatar.com/avatar/21dbdea01fcce17bbd75a73f51d13aaf?s=96&d=retro',
          privilege: 2
        },
        {
          name: 'Damas',
          email: 'mbswan@me.com',
          picture:
            'https://s.gravatar.com/avatar/0fe88c8fb067972b303a8dd61f8dc5ce?s=96&d=retro'
        },
        {
          name: 'Fedeli',
          email: 'ardagna@aol.com',
          picture:
            'https://s.gravatar.com/avatar/62182d01e55b4eb837e2b9eb5fef5410?s=96&d=retro'
        },
        {
          name: 'Polloni',
          email: 'malin@live.com',
          picture:
            'https://s.gravatar.com/avatar/aee06ee04313c8ccc8b6a1d389916bc2?s=96&d=retro'
        },
        {
          name: 'Peres',
          email: 'magusnet@sbcglobal.net',
          picture:
            'https://s.gravatar.com/avatar/b4f886c65e8cc79a0dbb4fa11b7f2b57?s=96&d=retro'
        },
        {
          name: 'Newton',
          email: 'phish@optonline.net',
          picture:
            'https://s.gravatar.com/avatar/761b9d7f608e7987f160391d893cb410?s=96&d=retro'
        },
        {
          name: 'José',
          email: 'rmcfarla@yahoo.ca',
          picture:
            'https://s.gravatar.com/avatar/eb1842899353f24d269f3991b426061e?s=96&d=retro'
        },
        {
          name: 'Vieira',
          email: 'greear@live.com',
          picture:
            'https://s.gravatar.com/avatar/23067fff8b777dd7eb7f6fd7536b0704?s=96&d=retro'
        },
        {
          name: 'Tenenbaun',
          email: 'errxn@comcast.net',
          picture:
            'https://s.gravatar.com/avatar/74ebaf9d02e808276372b267c123a260?s=96&d=retro'
        },
        {
          name: 'Langsam',
          email: 'jugalator@icloud.com',
          picture:
            'https://s.gravatar.com/avatar/aecbb5fe9c5944be9527d9054dc64f63?s=96&d=retro'
        },
        {
          name: 'Augenstein',
          email: 'qrczak@outlook.com',
          picture:
            'https://s.gravatar.com/avatar/8ee2f8233ee9ac37af29f1655863626c?s=96&d=retro'
        },
        {
          name: 'Leon',
          email: 'jramio@outlook.com',
          picture:
            'https://s.gravatar.com/avatar/d685e576556e503c3ca97f19e48d9040?s=96&d=retro'
        },
        {
          name: 'Moysés',
          email: 'catalog@sbcglobal.net',
          picture:
            'https://s.gravatar.com/avatar/5f0770ae865258f38351940a8fb03f1b?s=96&d=retro'
        },
        {
          name: 'Nussenzveig',
          email: 'dhrakar@yahoo.ca',
          picture:
            'https://s.gravatar.com/avatar/254f0e814fef3a813cf2581147ee6e16?s=96&d=retro'
        },
        {
          name: 'Resnick',
          email: 'shaffei@mac.com',
          picture:
            'https://s.gravatar.com/avatar/457e05ded2ce000f8819a281a16f1f8d?s=96&d=retro'
        },
        {
          name: 'Halliday',
          email: 'parrt@live.com',
          picture:
            'https://s.gravatar.com/avatar/8d9f400fbdf2d2e4bade91f23ceebd8b?s=96&d=retro'
        },
        {
          name: 'Thomson',
          email: 'keijser@gmail.com',
          picture:
            'https://s.gravatar.com/avatar/0af128c3c0007ac74a8c40b0dd11ffa1?s=96&d=retro'
        }
      ]);
    });
};
