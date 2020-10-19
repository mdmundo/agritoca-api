const request = require('supertest');
const app = require('../src/app');
const { users } = require('./fixtures/db');

// only the first page
test('Should fetch first products', async () => {
  const response = await request(app).get('/products/').send().expect(200);
});
