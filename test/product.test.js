const request = require('supertest');
const app = require('../src/app');
const { setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

// only the first page
test('Should fetch first products', async () => {
  const response = await request(app).get('/products/').send().expect(200);
});
