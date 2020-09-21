const request = require('supertest');
const app = require('../src/app');
const { setupDatabase, users } = require('./fixtures/db');

beforeEach(setupDatabase);

// only the first page
test('Should fetch first producer products history', async () => {
  const response = await request(app)
    .get('/producerProductsHistory/')
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);
});

test('Should not fetch first producer products history (unauthenticated)', async () => {
  const response = await request(app)
    .get('/producerProductsHistory/')
    .send()
    .expect(401);
});

test('Should not fetch first producer products history (unauthorized)', async () => {
  const response = await request(app)
    .get('/producerProductsHistory/')
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(403);
});