const request = require('supertest');
const app = require('../src/app');
const knex = require('../database/connection');
const { users } = require('./fixtures/db');
const path = require('path');

/* Add a test to response "Error on Server" due to empty db. */

// only the first page
test('Should fetch first products', async () => {
  await request(app).get('/products').send().expect(200);
});

test('Should not fetch products due to empty db', async () => {
  await knex.migrate.rollback({}, true);
  await request(app).get('/products').send().expect(500);
});

test('Should fetch product by ID', async () => {
  const id = 1;
  const product = await knex('products').where({ id }).first();
  product.picture = undefined;

  const response = await request(app).get(`/products/${id}`).send().expect(200);

  expect(JSON.stringify(response.body)).toEqual(JSON.stringify(product));
});

test('Should fetch product picture by ID', async () => {
  const id = 1;
  const { picture } = await knex('products').where({ id }).first();
  const response = await request(app)
    .get(`/products/${id}/picture`)
    .send()
    .expect(200);

  expect(response.body).toEqual(picture);
});

test('Should not fetch picture of nonexisting product', async () => {
  const id = 9999;
  await request(app).get(`/products/${id}/picture`).send().expect(404);
});

test('Should fetch default product picture', async () => {
  const id = 6;
  await request(app).get(`/products/${id}/picture`).send().expect(302);
});

test('Should create a new product', async () => {
  const newProduct = {
    ncm: '99999999',
    measure: 'UN',
    description: 'SUCO DE UVA',
    is_organic: true
  };

  const response = await request(app)
    .post(`/products`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProduct)
    .expect(201);

  const productCreated = await knex('products')
    .where({ id: response.body.id })
    .first();
  productCreated.picture = undefined;

  expect(JSON.stringify(response.body)).toEqual(JSON.stringify(productCreated));
});

test('Should create a new product as a mod', async () => {
  const newProduct = {
    ncm: '99999999',
    measure: 'UN',
    description: 'SUCO DE UVA',
    is_organic: true
  };

  const response = await request(app)
    .post(`/products`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send(newProduct)
    .expect(201);

  const productCreated = await knex('products')
    .where({ id: response.body.id })
    .first();
  productCreated.picture = undefined;

  expect(JSON.stringify(response.body)).toEqual(JSON.stringify(productCreated));
});

test('Should not create with invalid field', async () => {
  const newProduct = {
    ncm: '99999999',
    measure: 'UN',
    description: 'SUCO DE UVA',
    is_organic: true,
    invalid: 'Literally an invalid field'
  };

  await request(app)
    .post(`/products`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProduct)
    .expect(400);
});

test('Should not create with invalid data', async () => {
  const newProduct = {
    ncm: '99999999',
    measure: 'UN',
    description: 'SUCO DE UVA',
    is_organic: "I don't know, maybe"
  };

  await request(app)
    .post(`/products`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProduct)
    .expect(400);
});

test('Should not create with invalid data', async () => {
  const newProduct = {
    ncm: 'Should it be alphanumeric?',
    measure: 'UN',
    description: 'SUCO DE UVA',
    is_organic: false
  };

  await request(app)
    .post(`/products`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProduct)
    .expect(400);
});

test('Should not create without auth', async () => {
  const newProduct = {
    ncm: '99999999',
    measure: 'UN',
    description: 'SUCO DE UVA',
    is_organic: true
  };

  await request(app).post(`/products`).send(newProduct).expect(401);
});

test('Should not create without privilege', async () => {
  const newProduct = {
    ncm: '99999999',
    measure: 'UN',
    description: 'SUCO DE UVA',
    is_organic: true
  };

  await request(app)
    .post(`/products`)
    .set('Authorization', `Bearer ${users[2].token}`)
    .send(newProduct)
    .expect(403);
});

test('Should update only description', async () => {
  const id = 1;
  const description = 'New description';
  const product = await knex('products').where({ id }).first();

  const response = await request(app)
    .patch(`/products/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ description })
    .expect(200);

  expect(response.body.id).toBe(product.id);
  expect(response.body.ncm).toBe(product.ncm);
  expect(response.body.description).not.toBe(product.description);
  expect(response.body.updated_at).not.toBe(product.updated_at.toString());
});

test('Should update with mod privilege', async () => {
  const id = 1;
  const description = 'New description';
  const product = await knex('products').where({ id }).first();

  const response = await request(app)
    .patch(`/products/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send({ description })
    .expect(200);

  expect(response.body.description).not.toBe(product.description);
});

test('Should not update without privilege', async () => {
  const id = 1;
  const description = 'New description';

  await request(app)
    .patch(`/products/${id}`)
    .set('Authorization', `Bearer ${users[2].token}`)
    .send({ description })
    .expect(403);
});

test('Should not update without auth', async () => {
  const id = 1;
  const description = 'New description';

  await request(app).patch(`/products/${id}`).send({ description }).expect(401);
});

test('Should not update invalid field', async () => {
  const id = 1;
  const mod = 'invalid@example.com';

  await request(app)
    .patch(`/products/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ mod })
    .expect(400);
});

test('Should not update invalid data', async () => {
  const id = 1;
  const is_organic = 'Maybe, I do not know';

  await request(app)
    .patch(`/products/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ is_organic })
    .expect(400);
});

test('Should upload product picture', async () => {
  const id = 1;
  const picturePath = path.join(
    __dirname,
    './fixtures/upload/valid-upload.png'
  );

  await request(app)
    .post(`/products/${id}/picture`)
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
    .post(`/products/${id}/picture`)
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
    .post(`/products/${id}/picture`)
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
    .post(`/products/${id}/picture`)
    .attach('picture', picturePath)
    .expect(401);
});

test('Should delete product by ID', async () => {
  const id = 1;
  await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const product = await knex('products').where({ id }).first();
  expect(product).toBe(undefined);
});

test('Should not delete product without auth', async () => {
  const id = 1;
  await request(app).delete(`/products/${id}`).send().expect(401);
});

test('Should delete product as a mod', async () => {
  const id = 1;
  await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);

  const product = await knex('products').where({ id }).first();
  expect(product).toBe(undefined);
});

test('Should not delete product without privilege', async () => {
  const id = 1;
  await request(app)
    .delete(`/products/${id}`)
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(403);
});
