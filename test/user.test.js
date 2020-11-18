const request = require('supertest');
const app = require('../src/app');
const knex = require('../database/connection');
const { users } = require('./fixtures/db');

// only the first page
test('Should fetch users (admin)', async () => {
  await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const user = await knex('users').where({ id: users[0].id }).first();
  expect(user.privilege).toBe(2);
});

test('Should not fetch users (not admin)', async () => {
  await request(app)
    .get('/users')
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(403);

  const user = await knex('users').where({ id: users[1].id }).first();
  expect(user.privilege).not.toBe(2);
});

test('Should fetch current user', async () => {
  await request(app)
    .get('/me')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);
});

test('Should set admin privilege', async () => {
  await request(app)
    .patch(`/users/${users[1].id}/set/admin`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const user = await knex('users').where({ id: users[1].id }).first();
  expect(user.privilege).toBe(2);
});

test('Should revoke all privileges from user', async () => {
  await request(app)
    .patch(`/users/${users[1].id}/unset`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const user = await knex('users').where({ id: users[1].id }).first();
  expect(user.privilege).toBe(0);
});

test('Should delete current user', async () => {
  await request(app)
    .delete('/me')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const user = await knex('users').where({ id: users[0].id }).first();
  expect(user).toBe(undefined);
});

test('Should not delete other users', async () => {
  const id = 1;

  await request(app)
    .delete(`/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(404);
});
