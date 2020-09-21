const request = require('supertest');
const app = require('../src/app');
const { setupDatabase } = require('./fixtures/db');

beforeEach(setupDatabase);

// only the first page
test('Should fetch first producer products', async () => {
  const response = await request(app)
    .get('/producerProducts/')
    .send()
    .expect(200);
});
