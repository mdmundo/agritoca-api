const request = require('supertest');
const app = require('../src/app');
const knex = require('../src/database/connection');
const { setupDatabase, setupAuth, users } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      email: 'newuser123@msn.com',
      password: 'Qqk}X%CPuDte5jw]'
    })
    .expect(201);
});

test('Should not create existing user', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      email: 'teverett@msn.com',
      password: 'Qqk}X%CPuDte5jw]'
    })
    .expect(400);
});

describe('Require authentication', () => {
  beforeEach(setupAuth);

  test('Should fetch all users (admin)', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${users[0].token}`)
      .send()
      .expect(200);
  });

  test('Should not fetch all users (mod)', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${users[1].token}`)
      .send()
      .expect(401);
  });
});
