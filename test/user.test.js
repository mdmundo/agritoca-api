const request = require('supertest');
const app = require('../src/app');
const knex = require('../src/database/connection');
const { setupDatabase, users } = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should fetch all users (admin)', async () => {
  const response = await request(app)
    .get('/users/')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const user = await knex('users').where('id', '=', users[0].id).first();
  expect(user.privilege).toBe(2);
});

test('Should not fetch all users (not admin)', async () => {
  const response = await request(app)
    .get('/users/')
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(401);

  const user = await knex('users').where('id', '=', users[1].id).first();
  expect(user.privilege).not.toBe(2);
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
  expect(user.privilege).toBe(2);
});

test('Should revoke all privileges', async () => {
  const response = await request(app)
    .post('/users/unset')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ id: users[1].id })
    .expect(200);

  const user = await knex('users').where('id', '=', users[1].id).first();
  expect(user.privilege).toBe(0);
});

test('Should delete current user', async () => {
  const response = await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const user = await knex('users').where('id', '=', users[0].id).first();
  expect(user).toBe(undefined);
});
