const request = require('supertest');
const app = require('../src/app');
const knex = require('../database/connection');
const { users } = require('./fixtures/db');

test('Should fetch producers history', async () => {
  await request(app)
    .get('/producersHistory')
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);
});

test('Should not fetch first producers history (unauthenticated)', async () => {
  await request(app).get('/producersHistory').send().expect(401);
});

test('Should not fetch first producers history (unauthorized)', async () => {
  await request(app)
    .get('/producersHistory')
    .set('Authorization', `Bearer ${users[2].token}`)
    .send()
    .expect(403);
});

test('Should fetch history by ID', async () => {
  const id = 1;
  const response = await request(app)
    .get(`/producersHistory/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const history = await knex('producers_history').where({ id }).first();

  expect(JSON.stringify(response.body)).toEqual(JSON.stringify(history));
});

test('Should not fetch history by nonexisting ID', async () => {
  const id = 9999;
  await request(app)
    .get(`/producersHistory/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(404);
});

test('Should fetch history by producer ID', async () => {
  const producer_id = 1;
  const response = await request(app)
    .get(`/producersHistory?producer_id=${producer_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].producer_id).toBe(producer_id);
});

test('Should fetch history by nonexisting producer ID', async () => {
  const producer_id = 9999;
  const response = await request(app)
    .get(`/producersHistory?producer_id=${producer_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body).toEqual([]);
});

test('Should add new register by updating producer', async () => {
  const producer_id = 1;
  const whatsapp = '5595956626321';

  await request(app)
    .patch(`/producers/${producer_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send({ whatsapp })
    .expect(200);

  const response = await request(app)
    .get(`/producersHistory?producer_id=${producer_id}&direction=desc`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].producer_id).toBe(producer_id);
  expect(response.body[0].whatsapp).toBe(whatsapp);
});

test('Should add new register by creating producer', async () => {
  const newProducer = {
    cpf: '88770452071',
    cnpj: '68893557946613',
    name: 'Comes e Bebes',
    whatsapp: '5595956626321',
    address: '77500000, St. Main, Porto Nacional, Tocantins',
    ie: '13902142293',
    im: '45809714081'
  };

  const creationResponse = await request(app)
    .post(`/producers`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send(newProducer)
    .expect(201);

  const producer_id = creationResponse.body.id;

  const response = await request(app)
    .get(`/producersHistory?direction=desc`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].producer_id).toBe(producer_id);
});

test('Should add new register by deleting producer', async () => {
  const producer_id = 1;
  await request(app)
    .delete(`/producers/${producer_id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  const response = await request(app)
    .get(`/producersHistory?direction=desc`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);

  expect(response.body[0].producer_id).toBe(producer_id);
  expect(response.body[0].deleted_at).not.toBe(null);
});

test('Should restore producer as admin', async () => {
  const id = 1;

  await request(app)
    .post(`/producersHistory/${id}`)
    .set('Authorization', `Bearer ${users[0].token}`)
    .send()
    .expect(200);
});

test('Should not restore producer as mod and not owner', async () => {
  const id = 1;

  await request(app)
    .post(`/producersHistory/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(500);
});

test('Should restore producer as mod and owner', async () => {
  const id = 2;

  await request(app)
    .post(`/producersHistory/${id}`)
    .set('Authorization', `Bearer ${users[1].token}`)
    .send()
    .expect(200);
});
