const request = require('supertest');
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

  expect(response.body).toEqual(history);
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

  expect(response.body).toBe(picture);
});

// Should fetch picture by ID
// Should fetch by productId
// Should fetch by producerProductId

// Should add new register by updating producerProduct
// Should add new register by creating producerProduct
// Should add new register by deleting producerProduct
// Should add many registers by deleting producer
// Should add many registers by deleting product

// Should restore register producerProduct
