const request = require('supertest');
const app = require('../src/app');
const knex = require('../src/database/connection');
const { setupDatabase, setupAuth, users } = require('./fixtures/db');

beforeEach(setupDatabase);

describe('Require authentication', () => {
  beforeEach(setupAuth);

  test('Should fetch all users (admin)', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${users[0].token}`)
      .send()
      .expect(200);

    const user = await knex('users').where('id', '=', users[0].id).first();
    expect(user.is_admin).toBe(true);
  });

  test('Should not fetch all users (not admin)', async () => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', `Bearer ${users[1].token}`)
      .send()
      .expect(401);

    const user = await knex('users').where('id', '=', users[1].id).first();
    expect(user.is_admin).toBe(false);
  });

  test('Should fetch current user', async () => {
    const response = await request(app)
      .get('/users/me')
      .set('Authorization', `Bearer ${users[0].token}`)
      .send()
      .expect(200);
  });

  test('Should set admin privilege', async () => {
    const response = await request(app)
      .post('/users/set/admin')
      .set('Authorization', `Bearer ${users[0].token}`)
      .send({ id: users[1].id })
      .expect(200);

    const user = await knex('users').where('id', '=', users[1].id).first();
    expect(user.is_admin).toBe(true);
  });

  test('Should unset mod privilege', async () => {
    const response = await request(app)
      .post('/users/unset/mod')
      .set('Authorization', `Bearer ${users[0].token}`)
      .send({ id: users[1].id })
      .expect(200);

    const user = await knex('users').where('id', '=', users[1].id).first();
    expect(user.is_mod).toBe(false);
  });
});
