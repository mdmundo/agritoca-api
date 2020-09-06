const gravatar = require('gravatar');

const picture = (user) =>
  gravatar.url(user.email, {
    protocol: 'https',
    s: '96',
    d: 'retro'
  });

module.exports = picture;

// const fetch = require('node-fetch');
// to test if the gravatar exists
// const urlProfile = gravatar.profile_url(user.email, { protocol: 'https' });
// const { status } = await fetch(urlProfile);
// if (status === 200)
