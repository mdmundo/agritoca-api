const request = require('supertest');
const app = require('../src/app');
const { users } = require('./fixtures/db');

// only the first page
test('Should fetch first producer products', async () => {
  const response = await request(app)
    .get('/producerProducts')
    .send()
    .expect(200);
});
