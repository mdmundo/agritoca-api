const request = require('supertest');
const app = require('../src/app');
const knex = require('../database/connection');
const { users } = require('./fixtures/db');

test('Should fetch all baskets from current user', async () => {
  const response = await request(app)
    .get('/baskets')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const { user_baskets: baskets } = await knex('baskets')
    .where({ user_id: users[0].id })
    .first();

  expect(baskets).toEqual(response.body);
});

test('Should fetch empty baskets array due to empty table', async () => {
  await knex('baskets').del();

  const response = await request(app)
    .get('/baskets')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

test('Should update baskets from current user', async () => {
  const baskets = [
    {
      id: 'd0819442-d50e-4706-b363-de0150494656',
      name: 'Cesta #9',
      notes: 'Practice does not make perfect, perfect practice makes perfect.',
      items: 'Items is now a string'
    }
  ];

  await request(app)
    .patch('/baskets')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(baskets)
    .expect(200);

  const { user_baskets: updatedBaskets } = await knex('baskets')
    .where({ user_id: users[0].id })
    .first();

  expect(baskets).toEqual(updatedBaskets);
});
