const request = require('supertest');
const app = require('../src/app');
const knex = require('../database/connection');
const { users } = require('./fixtures/db');

test('Should fetch producers with private data (admin)', async () => {
  const response = await request(app)
    .get('/producers')
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const [producer] = await knex('producers');

  expect(JSON.stringify(response.body[0])).toEqual(JSON.stringify(producer));
});

test('Should fetch producers with private data (mod)', async () => {
  const response = await request(app)
    .get('/producers')
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);

  const [producer] = await knex('producers');

  expect(JSON.stringify(response.body[0])).toEqual(JSON.stringify(producer));
});

test('Should fetch producers without private data (regular)', async () => {
  const response = await request(app)
    .get('/producers')
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(200);

  const [producer] = await knex('producers');
  producer.cpf = undefined;
  producer.cnpj = undefined;
  producer.ie = undefined;
  producer.im = undefined;

  expect(JSON.stringify(response.body[0])).toEqual(JSON.stringify(producer));
});

test('Should fetch producers without private data (noauth)', async () => {
  const response = await request(app).get('/producers').send().expect(200);

  const [producer] = await knex('producers');
  producer.cpf = undefined;
  producer.cnpj = undefined;
  producer.ie = undefined;
  producer.im = undefined;

  expect(JSON.stringify(response.body[0])).toEqual(JSON.stringify(producer));
});

test('Should not fetch producers due to empty db', async () => {
  await knex.migrate.rollback({}, true);
  await request(app).get('/producers').send().expect(500);
});

test('Should fetch producer by ID with private data (admin)', async () => {
  const id = 1;
  const producer = await knex('producers').where({ id }).first();

  const response = await request(app)
    .get(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(JSON.stringify(response.body)).toEqual(JSON.stringify(producer));
});

test('Should not fetch producer by ID due to empty db', async () => {
  const id = 1;

  await knex.migrate.rollback({}, true);

  await request(app).get(`/producers/${id}`).send().expect(500);
});

test('Should not find a producer by ID', async () => {
  const id = 999;

  await request(app).get(`/producers/${id}`).send().expect(404);
});

test('Should fetch producer by ID with private data (mod)', async () => {
  const id = 1;
  const producer = await knex('producers').where({ id }).first();

  const response = await request(app)
    .get(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);

  expect(JSON.stringify(response.body)).toEqual(JSON.stringify(producer));
});

test('Should fetch producer by ID without private data (regular)', async () => {
  const id = 1;
  const producer = await knex('producers').where({ id }).first();
  producer.cpf = undefined;
  producer.cnpj = undefined;
  producer.ie = undefined;
  producer.im = undefined;

  const response = await request(app)
    .get(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(200);

  expect(JSON.stringify(response.body)).toEqual(JSON.stringify(producer));
});

test('Should fetch producer by ID without private data (noauth)', async () => {
  const id = 1;
  const producer = await knex('producers').where({ id }).first();
  producer.cpf = undefined;
  producer.cnpj = undefined;
  producer.ie = undefined;
  producer.im = undefined;

  const response = await request(app)
    .get(`/producers/${id}`)
    .send()
    .expect(200);

  expect(JSON.stringify(response.body)).toEqual(JSON.stringify(producer));
});

test('Should create a new producer', async () => {
  const newProducer = {
    cpf: '88770452071',
    cnpj: '68893557946613',
    name: 'Comes e Bebes',
    whatsapp: '5595956626321',
    address: '77500000, St. Main, Porto Nacional, Tocantins',
    ie: '13902142293',
    im: '45809714081'
  };

  const response = await request(app)
    .post(`/producers`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProducer)
    .expect(201);

  const producerCreated = await knex('producers')
    .where({ id: response.body.id })
    .first();

  expect(JSON.stringify(response.body)).toEqual(
    JSON.stringify(producerCreated)
  );
});

test('Should create a new producer as a mod', async () => {
  const newProducer = {
    cpf: '88770452071',
    cnpj: '68893557946613',
    name: 'Comes e Bebes',
    whatsapp: '5595956626321',
    address: '77500000, St. Main, Porto Nacional, Tocantins',
    ie: '13902142293',
    im: '45809714081'
  };

  const response = await request(app)
    .post(`/producers`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send(newProducer)
    .expect(201);

  const productCreated = await knex('producers')
    .where({ id: response.body.id })
    .first();

  expect(JSON.stringify(response.body)).toEqual(JSON.stringify(productCreated));
});

test('Should not create with invalid field', async () => {
  const newProducer = {
    cpf: '88770452071',
    cnpj: '68893557946613',
    name: 'Comes e Bebes',
    whatsapp: '5595956626321',
    address: '77500000, St. Main, Porto Nacional, Tocantins',
    ie: '13902142293',
    im: '45809714081',
    invalid: 'Literally an invalid field'
  };

  await request(app)
    .post(`/producers`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProducer)
    .expect(400);
});

test('Should not create with invalid data', async () => {
  const newProducer = {
    cpf: '88770452071',
    cnpj: '68893557946613',
    name: 'Comes e Bebes',
    whatsapp: 'an invalid phone number',
    address: '77500000, St. Main, Porto Nacional, Tocantins',
    ie: '13902142293',
    im: '45809714081'
  };

  await request(app)
    .post(`/producers`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProducer)
    .expect(400);
});

test('Should not create with invalid data', async () => {
  const newProducer = {
    cpf: 'invalid cpf',
    cnpj: '68893557946613',
    name: 'Comes e Bebes',
    whatsapp: '5595956626321',
    address: '77500000, St. Main, Porto Nacional, Tocantins',
    ie: '13902142293',
    im: '45809714081'
  };

  await request(app)
    .post(`/producers`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProducer)
    .expect(400);
});

test('Should not create with invalid data', async () => {
  const newProducer = {
    cpf: '88770452071',
    cnpj: 'invalid cnpj',
    name: 'Comes e Bebes',
    whatsapp: '5595956626321',
    address: '77500000, St. Main, Porto Nacional, Tocantins',
    ie: '13902142293',
    im: '45809714081'
  };

  await request(app)
    .post(`/producers`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProducer)
    .expect(400);
});

test('Should not create without auth', async () => {
  const newProducer = {
    cpf: '88770452071',
    cnpj: '68893557946613',
    name: 'Comes e Bebes',
    whatsapp: '5595956626321',
    address: '77500000, St. Main, Porto Nacional, Tocantins',
    ie: '13902142293',
    im: '45809714081'
  };

  await request(app).post(`/producers`).send(newProducer).expect(401);
});

test('Should not create without privilege', async () => {
  const newProducer = {
    cpf: '88770452071',
    cnpj: '68893557946613',
    name: 'Comes e Bebes',
    whatsapp: '5595956626321',
    address: '77500000, St. Main, Porto Nacional, Tocantins',
    ie: '13902142293',
    im: '45809714081'
  };

  await request(app)
    .post(`/producers`)
    .set('Authorization', `Bearer ${users[2].token}`)
    .send(newProducer)
    .expect(403);
});

test('Should update only whatsapp', async () => {
  const id = 1;
  const whatsapp = '5595956626321';
  const producer = await knex('producers').where({ id }).first();

  const response = await request(app)
    .patch(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ whatsapp })
    .expect(200);

  expect(response.body.id).toBe(producer.id);
  expect(response.body.cpf).toBe(producer.cpf);
  expect(response.body.cnpj).toBe(producer.cnpj);
  expect(response.body.name).toBe(producer.name);
  expect(response.body.address).toBe(producer.address);
  expect(response.body.ie).toBe(producer.ie);
  expect(response.body.im).toBe(producer.im);
  expect(response.body.whatsapp).not.toBe(producer.whatsapp);
  expect(response.body.updated_at).not.toBe(producer.updated_at.toString());
});

test('Should update only cpf', async () => {
  const id = 1;
  const cpf = '88770452071';
  const producer = await knex('producers').where({ id }).first();

  const response = await request(app)
    .patch(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ cpf })
    .expect(200);

  expect(response.body.id).toBe(producer.id);
  expect(response.body.cnpj).toBe(producer.cnpj);
  expect(response.body.name).toBe(producer.name);
  expect(response.body.whatsapp).toBe(producer.whatsapp);
  expect(response.body.address).toBe(producer.address);
  expect(response.body.ie).toBe(producer.ie);
  expect(response.body.im).toBe(producer.im);
  expect(response.body.cpf).not.toBe(producer.cpf);
  expect(response.body.updated_at).not.toBe(producer.updated_at.toString());
});

test('Should update with mod privilege', async () => {
  const id = 1;
  const whatsapp = '5595956626321';
  const producer = await knex('producers').where({ id }).first();

  const response = await request(app)
    .patch(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send({ whatsapp })
    .expect(200);

  expect(response.body.whatsapp).not.toBe(producer.whatsapp);
});

test('Should not update without privilege', async () => {
  const id = 1;
  const whatsapp = '5595956626321';

  await request(app)
    .patch(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[2].token}`)
    .send({ whatsapp })
    .expect(403);
});

test('Should not update due to empty table', async () => {
  const id = 1;
  const whatsapp = '5595956626321';

  await knex('producer_products').del();
  await knex('producers').del();

  await request(app)
    .patch(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ whatsapp })
    .expect(500);
});

test('Should not update without auth', async () => {
  const id = 1;
  const whatsapp = '5595956626321';

  await request(app).patch(`/producers/${id}`).send({ whatsapp }).expect(401);
});

test('Should not update invalid field', async () => {
  const id = 1;
  const mod = 'invalid@example.com';

  await request(app)
    .patch(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ mod })
    .expect(400);
});

test('Should not update invalid data', async () => {
  const id = 1;
  const cpf = 'I do not know';

  await request(app)
    .patch(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ cpf })
    .expect(400);
});

test('Should delete producer by ID', async () => {
  const id = 1;
  await request(app)
    .delete(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const producer = await knex('producers').where({ id }).first();
  expect(producer).toBe(undefined);
});

test('Should not delete due to empty table', async () => {
  const id = 1;

  await knex('producer_products').del();
  await knex('producers').del();

  await request(app)
    .delete(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(500);
});

test('Should not delete producer without auth', async () => {
  const id = 1;
  await request(app).delete(`/producers/${id}`).send().expect(401);
});

test('Should delete producer as a mod', async () => {
  const id = 1;
  await request(app)
    .delete(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);

  const producer = await knex('producers').where({ id }).first();
  expect(producer).toBe(undefined);
});

test('Should not delete producer without privilege', async () => {
  const id = 1;
  await request(app)
    .delete(`/producers/${id}`)
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(403);
});
