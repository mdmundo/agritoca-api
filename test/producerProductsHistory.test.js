const request = require('supertest');
const { encode } = require('base64-arraybuffer');
const app = require('../src/app');
const knex = require('../database/connection');
const { users } = require('./fixtures/db');

test('Should fetch producer products history as admin', async () => {
  await request(app)
    .get('/producerProductsHistory')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);
});

test('Should fetch producer products history as mod', async () => {
  await request(app)
    .get('/producerProductsHistory')
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);
});

test('Should not fetch first producer products history (unauthenticated)', async () => {
  await request(app).get('/producerProductsHistory').send().expect(401);
});

test('Should fetch empty array due to empty table', async () => {
  await knex('producer_products_history').del();

  const response = await request(app)
    .get('/producerProductsHistory')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

test('Should not fetch first producer products history (unauthorized)', async () => {
  await request(app)
    .get('/producerProductsHistory')
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(403);
});

test('Should fetch history by ID', async () => {
  const id = 1;
  const response = await request(app)
    .get(`/producerProductsHistory/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const history = await knex('producer_products_history').where({ id }).first();

  history.picture = undefined;

  expect(JSON.stringify(response.body)).toEqual(JSON.stringify(history));
});

test('Should not fetch history by nonexisting ID', async () => {
  const id = 9999;
  await request(app)
    .get(`/producerProductsHistory/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(404);
});

test('Should fetch history by producer product ID', async () => {
  const producer_product_id = 1;
  const response = await request(app)
    .get(`/producerProductsHistory?producer_product_id=${producer_product_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].producer_product_id).toBe(producer_product_id);
});

test('Should fetch history by nonexisting producer product ID', async () => {
  const producer_product_id = 9999;
  const response = await request(app)
    .get(`/producerProductsHistory?producer_product_id=${producer_product_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

test('Should fetch history by producer ID', async () => {
  const producer_id = 1;
  const response = await request(app)
    .get(`/producerProductsHistory?producer_id=${producer_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].producer_id).toBe(producer_id);
});

test('Should fetch history by nonexisting producer ID', async () => {
  const producer_id = 9999;
  const response = await request(app)
    .get(`/producerProductsHistory?producer_id=${producer_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

test('Should fetch history by product ID', async () => {
  const product_id = 1;
  const response = await request(app)
    .get(`/producerProductsHistory?product_id=${product_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].product_id).toBe(product_id);
});

test('Should fetch history by nonexisting product ID', async () => {
  const product_id = 9999;
  const response = await request(app)
    .get(`/producerProductsHistory?product_id=${product_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

test('Should fetch history picture by ID', async () => {
  const id = 1;

  const { picture } = await knex('producer_products_history')
    .where({ id })
    .first();

  const response = await request(app)
    .get(`/producerProductsHistory/${id}/picture`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toEqual(picture);
});

test('Should fetch history picture on base64 by ID', async () => {
  const id = 1;

  const { picture } = await knex('producer_products_history')
    .where({ id })
    .first();

  const base64 = encode(picture);

  const response = await request(app)
    .get(`/producerProductsHistory/${id}/picture?picture=base64`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toEqual({ picture: `data:image/png;base64,${base64}` });
});

test('Should add new registry by updating producer product', async () => {
  const producer_product_id = 1;
  const keywords = 'Apples, Healthy, Life, Best Seller';

  await request(app)
    .patch(`/producerProducts/${producer_product_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ keywords })
    .expect(200);

  const response = await request(app)
    .get(
      `/producerProductsHistory?producer_product_id=${producer_product_id}&direction=desc`
    )
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].producer_product_id).toBe(producer_product_id);
  expect(response.body[0].keywords).toBe(keywords);
});

test('Should add new registry by creating producer product', async () => {
  const newProducerProduct = {
    brand: 'IN NATURA',
    barcode: '405232088822',
    keywords: 'Banana, Prata, Terra',
    product_id: 10,
    producer_id: 1
  };

  const creationResponse = await request(app)
    .post(`/producerProducts`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProducerProduct)
    .expect(201);

  const producer_product_id = creationResponse.body.id;

  const response = await request(app)
    .get(`/producerProductsHistory?direction=desc`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].producer_product_id).toBe(producer_product_id);
});

test('Should add new registry by deleting producer product', async () => {
  const producer_product_id = 1;
  await request(app)
    .delete(`/producerProducts/${producer_product_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const response = await request(app)
    .get(`/producerProductsHistory?direction=desc`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].producer_product_id).toBe(producer_product_id);
  expect(response.body[0].deleted_at).not.toBe(null);
});

test('Should add many registries by deleting producer', async () => {
  const producer_id = 1;

  await request(app)
    .delete(`/producers/${producer_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const response = await request(app)
    .get(`/producerProductsHistory?direction=desc`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].producer_id).toBe(producer_id);
  expect(response.body[0].deleted_at).not.toBe(null);
});

test('Should add many registries by deleting product', async () => {
  const product_id = 1;

  await request(app)
    .delete(`/products/${product_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const response = await request(app)
    .get(`/producerProductsHistory?direction=desc`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].product_id).toBe(product_id);
  expect(response.body[0].deleted_at).not.toBe(null);
});

test('Should restore producer product', async () => {
  const id = 1;

  await request(app)
    .post(`/producerProductsHistory/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);
});

test('Should restore producer product as mod', async () => {
  const id = 2;

  await request(app)
    .post(`/producerProductsHistory/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);
});

test('Should not restore producer product as mod not owner', async () => {
  const id = 1;

  await request(app)
    .post(`/producerProductsHistory/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(500);
});
