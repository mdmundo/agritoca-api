const rateLimit = require('express-rate-limit');

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 600,
  message: { message: 'Too many requests, please try again later.' }
});

module.exports = { limiter };
