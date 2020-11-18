const request = require('supertest');
const app = require('../src/app');
const knex = require('../database/connection');
const { users } = require('./fixtures/db');

test('Should fetch producers history', async () => {
  await request(app)
    .get('/producersHistory')
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);
});

test('Should not fetch first producers history (unauthenticated)', async () => {
  await request(app).get('/producersHistory').send().expect(401);
});

test('Should not fetch first producers history (unauthorized)', async () => {
  await request(app)
    .get('/producersHistory')
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(403);
});
