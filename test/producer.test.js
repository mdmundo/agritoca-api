const request = require('supertest');
const app = require('../src/app');
const { users } = require('./fixtures/db');

// only the first page
test('Should fetch first producers', async () => {
  const response = await request(app).get('/producers').send().expect(200);
});
