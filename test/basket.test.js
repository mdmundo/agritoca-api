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

  expect({ baskets }).toEqual(response.body);
});

test('Should fetch empty baskets', async () => {
  await request(app)
    .get('/baskets')
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(500);
});

test('Should update baskets from current user', async () => {
  const baskets = {
    baskets: 'Practice does not make perfect, perfect practice makes perfect.'
  };

  await request(app)
    .patch('/baskets')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(baskets)
    .expect(200);

  const { user_baskets: updatedBaskets } = await knex('baskets')
    .where({ user_id: users[0].id })
    .first();

  expect(baskets).toEqual({ baskets: updatedBaskets });
});

test('Should add baskets from current user', async () => {
  const baskets = {
    baskets: 'Practice does not make perfect, perfect practice makes perfect.'
  };

  await request(app)
    .patch('/baskets')
    .set('Authorization', `Bearer ${users[2].token}`)
    .send(baskets)
    .expect(200);

  const { user_baskets: addedBaskets } = await knex('baskets')
    .where({ user_id: users[2].id })
    .first();

  expect(baskets).toEqual({ baskets: addedBaskets });
});
