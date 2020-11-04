const request = require('supertest');
const app = require('../src/app');
const { users } = require('./fixtures/db');

// only the first page
test('Should fetch first products history', async () => {
  const response = await request(app)
    .get('/productsHistory')
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);
});

test('Should not fetch first products history (unauthenticated)', async () => {
  const response = await request(app)
    .get('/productsHistory')
    .send()
    .expect(401);
});

test('Should not fetch first products history (unauthorized)', async () => {
  const response = await request(app)
    .get('/productsHistory')
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(403);
});
