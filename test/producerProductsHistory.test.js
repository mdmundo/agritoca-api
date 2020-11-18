const request = require('supertest');
const app = require('../src/app');
const { users } = require('./fixtures/db');

test('Should fetch producer products history', async () => {
  await request(app)
    .get('/producerProductsHistory')
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);
});

test('Should not fetch first producer products history (unauthenticated)', async () => {
  await request(app).get('/producerProductsHistory').send().expect(401);
});

test('Should not fetch first producer products history (unauthorized)', async () => {
  await request(app)
    .get('/producerProductsHistory')
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(403);
});
