const request = require('supertest');
const app = require('../src/app');
const knex = require('../database/connection');
const { users } = require('./fixtures/db');
const path = require('path');

test('Should fetch producer products', async () => {
  const response = await request(app)
    .get('/producerProducts')
    .send()
    .expect(200);
});

test('Should not fetch producer products due to empty db', async () => {
  await knex.migrate.rollback({}, true);
  await request(app).get('/producerProducts').send().expect(500);
});

test('Should not fetch producer product by ID due to empty db', async () => {
  const id = 1;

  await knex.migrate.rollback({}, true);

  await request(app).get(`/producerProducts/${id}`).send().expect(500);
});

test('Should fetch producer producerProduct by ID', async () => {
  const id = 1;
  const producerProduct = await knex
    .select(
      'products.ncm',
      'products.measure',
      'products.description',
      'products.is_organic',
      'producer_products.*'
    )
    .from('producer_products')
    .join('products', 'products.id', 'producer_products.product_id')
    .where('producer_products.id', id)
    .first();

  producerProduct.picture = undefined;

  const response = await request(app)
    .get(`/producerProducts/${id}`)
    .send()
    .expect(200);

  expect(JSON.stringify(response.body)).toEqual(
    JSON.stringify(producerProduct)
  );
});

test('Should fetch producer producerProduct picture by ID', async () => {
  const id = 1;
  const { picture } = await knex('producer_products').where({ id }).first();
  const response = await request(app)
    .get(`/producerProducts/${id}/picture`)
    .send()
    .expect(200);

  expect(response.body).toEqual(picture);
});

test('Should not fetch picture of nonexisting producer product', async () => {
  const id = 9999;
  await request(app).get(`/producerProducts/${id}/picture`).send().expect(404);
});

test('Should create a new producer product', async () => {
  const newProducerProduct = {
    brand: 'IN NATURA',
    barcode: '405232088822',
    keywords: 'Banana, Prata, Terra',
    product_id: 10,
    producer_id: 1
  };

  const response = await request(app)
    .post(`/producerProducts`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProducerProduct)
    .expect(201);

  const producerProductCreated = await knex('producer_products')
    .where({ id: response.body.id })
    .first();

  producerProductCreated.picture = undefined;

  expect(JSON.stringify(response.body)).toEqual(
    JSON.stringify(producerProductCreated)
  );
});

test('Should create a new producer producerProduct as a mod', async () => {
  const newProducerProduct = {
    brand: 'IN NATURA',
    barcode: '405232088822',
    keywords: 'Banana, Prata, Terra',
    product_id: 10,
    producer_id: 1
  };

  const response = await request(app)
    .post(`/producerProducts`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send(newProducerProduct)
    .expect(201);

  const producerProductCreated = await knex('producer_products')
    .where({ id: response.body.id })
    .first();

  producerProductCreated.picture = undefined;

  expect(JSON.stringify(response.body)).toEqual(
    JSON.stringify(producerProductCreated)
  );
});

test('Should not create with invalid field', async () => {
  const newProducerProduct = {
    brand: 'IN NATURA',
    barcode: '405232088822',
    keywords: 'Banana, Prata, Terra',
    product_id: 10,
    producer_id: 1,
    invalid: 'Literally an invalid field'
  };

  await request(app)
    .post(`/producerProducts`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProducerProduct)
    .expect(400);
});

test('Should not create with invalid data', async () => {
  const newProducerProduct = {
    brand: 'IN NATURA',
    barcode: '405232088822',
    keywords: 'Banana, Prata, Terra',
    product_id: 10,
    producer_id: 'I do not know, so I am not'
  };

  await request(app)
    .post(`/producerProducts`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProducerProduct)
    .expect(400);
});

test('Should not create with invalid data', async () => {
  const newProducerProduct = {
    brand: 'IN NATURA',
    barcode: { invalid: 'Should not accept this!' },
    keywords: 'Banana, Prata, Terra',
    product_id: 10,
    producer_id: 1
  };

  await request(app)
    .post(`/producerProducts`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProducerProduct)
    .expect(400);
});

test('Should not create without auth', async () => {
  const newProducerProduct = {
    brand: 'IN NATURA',
    barcode: '405232088822',
    keywords: 'Banana, Prata, Terra',
    product_id: 10,
    producer_id: 1
  };

  await request(app)
    .post(`/producerProducts`)
    .send(newProducerProduct)
    .expect(401);
});

test('Should not create without privilege', async () => {
  const newProducerProduct = {
    brand: 'IN NATURA',
    barcode: '405232088822',
    keywords: 'Banana, Prata, Terra',
    product_id: 10,
    producer_id: 1
  };

  await request(app)
    .post(`/producerProducts`)
    .set('Authorization', `Bearer ${users[2].token}`)
    .send(newProducerProduct)
    .expect(403);
});

test('Should not create producerProduct due to nonexisting foreign key', async () => {
  const newProducerProduct = {
    brand: 'IN NATURA',
    barcode: '405232088822',
    keywords: 'Banana, Prata, Terra',
    product_id: 9999,
    producer_id: 1
  };

  await request(app)
    .post(`/producerProducts`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProducerProduct)
    .expect(500);
});

test('Should update only keywords', async () => {
  const id = 1;
  const keywords = 'Apples, Healthy, Life, Best Seller';
  const producerProduct = await knex('producer_products').where({ id }).first();

  const response = await request(app)
    .patch(`/producerProducts/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ keywords })
    .expect(200);

  expect(response.body.id).toBe(producerProduct.id);
  expect(response.body.brand).toBe(producerProduct.brand);
  expect(response.body.barcode).toBe(producerProduct.barcode);
  expect(response.body.product_id).toBe(producerProduct.product_id);
  expect(response.body.producer_id).toBe(producerProduct.producer_id);
  expect(response.body.keywords).not.toBe(producerProduct.keywords);
  expect(response.body.updated_at).not.toBe(
    producerProduct.updated_at.toString()
  );
});

test('Should update with mod privilege', async () => {
  const id = 1;
  const keywords = 'Apples, Healthy, Life, Best Seller';
  const producerProduct = await knex('producer_products').where({ id }).first();

  const response = await request(app)
    .patch(`/producerProducts/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send({ keywords })
    .expect(200);

  expect(response.body.keywords).not.toBe(producerProduct.keywords);
});

test('Should not update without privilege', async () => {
  const id = 1;
  const keywords = 'Apples, Healthy, Life, Best Seller';

  await request(app)
    .patch(`/producerProducts/${id}`)
    .set('Authorization', `Bearer ${users[2].token}`)
    .send({ keywords })
    .expect(403);
});

test('Should not update without auth', async () => {
  const id = 1;
  const keywords = 'Apples, Healthy, Life, Best Seller';

  await request(app)
    .patch(`/producerProducts/${id}`)
    .send({ keywords })
    .expect(401);
});

test('Should not update invalid field', async () => {
  const id = 1;
  const mod = 'invalid@example.com';

  await request(app)
    .patch(`/producerProducts/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ mod })
    .expect(400);
});

test('Should not update invalid data', async () => {
  const id = 1;
  const barcode = { invalid: 'Should not accept this!' };

  await request(app)
    .patch(`/producerProducts/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ barcode })
    .expect(400);
});

test('Should not update due to empty table', async () => {
  const id = 1;
  const keywords = 'Apples, Healthy, Life, Best Seller';

  await knex('producer_products').del();

  await request(app)
    .patch(`/producerProducts/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ keywords })
    .expect(500);
});

test('Should upload producer product picture', async () => {
  const id = 1;
  const picturePath = path.join(
    __dirname,
    './fixtures/upload/valid-upload.png'
  );

  await request(app)
    .post(`/producerProducts/${id}/picture`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .attach('picture', picturePath)
    .expect(200);
});

test('Should not upload invalid file', async () => {
  const id = 1;
  const filePath = path.join(
    __dirname,
    './fixtures/upload/invalid-upload.json'
  );

  await request(app)
    .post(`/producerProducts/${id}/picture`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .attach('picture', filePath)
    .expect(400);
});

test('Should not upload without privilege', async () => {
  const id = 1;
  const picturePath = path.join(
    __dirname,
    './fixtures/upload/valid-upload.png'
  );

  await request(app)
    .post(`/producerProducts/${id}/picture`)
    .set('Authorization', `Bearer ${users[2].token}`)
    .attach('picture', picturePath)
    .expect(403);
});

test('Should not upload without auth', async () => {
  const id = 1;
  const picturePath = path.join(
    __dirname,
    './fixtures/upload/valid-upload.png'
  );

  await request(app)
    .post(`/producerProducts/${id}/picture`)
    .attach('picture', picturePath)
    .expect(401);
});

test('Should delete producer product by ID', async () => {
  const id = 1;
  await request(app)
    .delete(`/producerProducts/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const producerProduct = await knex('producer_products').where({ id }).first();
  expect(producerProduct).toBe(undefined);
});

test('Should not delete producer product without auth', async () => {
  const id = 1;
  await request(app).delete(`/producerProducts/${id}`).send().expect(401);
});

test('Should delete producer product as a mod', async () => {
  const id = 1;
  await request(app)
    .delete(`/producerProducts/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);

  const producerProduct = await knex('producer_products').where({ id }).first();
  expect(producerProduct).toBe(undefined);
});

test('Should not delete producer product without privilege', async () => {
  const id = 1;
  await request(app)
    .delete(`/producerProducts/${id}`)
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(403);
});

test('Should not delete due to empty table', async () => {
  const id = 1;

  await knex('producer_products').del();

  await request(app)
    .delete(`/producerProducts/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(500);
});

// Should not create producerProduct due to nonexisting foreign key
