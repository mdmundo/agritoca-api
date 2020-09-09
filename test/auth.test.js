const request = require('supertest');
const app = require('../src/app');
const knex = require('../src/database/connection');
const { setupDatabase, setupAuth, users } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should login user', async () => {
  const response = await request(app)
    .post('/users/login')
    .send({
      email: 'teverett@msn.com',
      password: 'Qqk}X%CPuDte5jw]'
    })
    .expect(200);
});

describe('Require authentication', () => {
  beforeEach(setupAuth);

  test('Should logout user', async () => {
    const response = await request(app)
      .post('/users/logout')
      .set('Authorization', `Bearer ${users[0].token}`)
      .send()
      .expect(200);
  });

  test('Should logout all user sessions', async () => {
    const response = await request(app)
      .post('/users/logoutAll')
      .set('Authorization', `Bearer ${users[0].token}`)
      .send()
      .expect(200);

    const authTokens = await knex('users_auth').where(
      'user_id',
      '=',
      users[0].id
    );

    expect(authTokens).toEqual([]);
  });
});
