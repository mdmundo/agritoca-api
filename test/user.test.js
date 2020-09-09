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

test('Should not create user with invalid email', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      email: 'not_a_valid_at_sign_email_dot_com',
      password: 'Qqk}X%CPuDte5jw]'
    })
    .expect(400);
});

test('Should not create user with short password', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      email: 'newuser123@msn.com',
      password: '1234567'
    })
    .expect(400);
});

test('Should not create user with invalid fields', async () => {
  const response = await request(app)
    .post('/users')
    .send({
      email: 'newuser123@msn.com',
      password: 'Qqk}X%CPuDte5jw]',
      is_admin: true,
      is_mod: true
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
