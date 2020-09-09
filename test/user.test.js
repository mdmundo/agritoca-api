const request = require('supertest');
const app = require('../src/app');
const { setupDatabase } = require('./fixtures/db');

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
