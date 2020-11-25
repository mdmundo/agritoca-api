const request = require('supertest');
const app = require('../src/app');
const knex = require('../database/connection');
const { users } = require('./fixtures/db');

test('Should fetch products history', async () => {
  await request(app)
    .get('/productsHistory')
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);
});

test('Should not fetch first products history (unauthenticated)', async () => {
  await request(app).get('/productsHistory').send().expect(401);
});

test('Should not fetch first products history (unauthorized)', async () => {
  await request(app)
    .get('/productsHistory')
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(403);
});

test('Should fetch history by ID', async () => {
  const id = 1;
  const response = await request(app)
    .get(`/productsHistory/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const history = await knex('products_history').where({ id }).first();

  history.picture = undefined;

  expect(JSON.stringify(response.body)).toEqual(JSON.stringify(history));
});

test('Should not fetch history by nonexisting ID', async () => {
  const id = 9999;
  await request(app)
    .get(`/productsHistory/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(404);
});

test('Should fetch history by product ID', async () => {
  const product_id = 1;
  const response = await request(app)
    .get(`/productsHistory?product_id=${product_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].product_id).toBe(product_id);
});

test('Should fetch history by nonexisting product ID', async () => {
  const product_id = 9999;
  const response = await request(app)
    .get(`/productsHistory?product_id=${product_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

test('Should fetch history picture by ID', async () => {
  const id = 1;

  const { picture } = await knex('products_history').where({ id }).first();

  const response = await request(app)
    .get(`/productsHistory/${id}/picture`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toEqual(picture);
});

test('Should add new registry by updating producer product', async () => {
  const product_id = 1;
  const description = 'New description';

  await request(app)
    .patch(`/products/${product_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ description })
    .expect(200);

  const response = await request(app)
    .get(`/productsHistory?product_id=${product_id}&direction=desc`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].product_id).toBe(product_id);
  expect(response.body[0].description).toBe(description);
});

test('Should add new registry by creating producer product', async () => {
  const newProduct = {
    ncm: '99999999',
    measure: 'UN',
    description: 'SUCO DE UVA',
    is_organic: true
  };

  const creationResponse = await request(app)
    .post(`/products`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProduct)
    .expect(201);

  const product_id = creationResponse.body.id;

  const response = await request(app)
    .get(`/productsHistory?direction=desc`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].product_id).toBe(product_id);
});

test('Should add new registry by deleting producer product', async () => {
  const product_id = 1;
  await request(app)
    .delete(`/products/${product_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const response = await request(app)
    .get(`/productsHistory?direction=desc`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].product_id).toBe(product_id);
  expect(response.body[0].deleted_at).not.toBe(null);
});

test('Should restore product', async () => {
  const id = 1;

  await request(app)
    .post(`/productsHistory/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);
});

test('Should restore product as mod', async () => {
  const id = 2;

  await request(app)
    .post(`/productsHistory/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);
});

test('Should not restore product as mod not owner', async () => {
  const id = 1;

  await request(app)
    .post(`/productsHistory/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(500);
});
