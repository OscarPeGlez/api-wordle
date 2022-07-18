/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import AppDateSource from '../db';
import app from '../app';

describe('PATH /api/v1/users', () => {
  const userRandom = Math.floor(Math.random() * 90000) + 10000;

  beforeAll(async () => {
    await AppDateSource.initialize();
  });

  afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await AppDateSource.destroy();
  });

  test('POST / Create user should response with status code 400', async () => {
    const res = await request(app).post('/api/v1/users').send({
      user: 'oscarpeglez1',
    });

    expect(res.statusCode).toEqual(400);
  });

  test('POST / Create user should response with status code 409', async () => {
    const res = await request(app).post('/api/v1/users').send({
      username: 'oscarpeglez1',
    });

    expect(res.statusCode).toEqual(409);
  });

  test('POST / Create user should response with status code 200', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({
        username: `userTest_${userRandom}`,
      });

    expect(res.statusCode).toEqual(200);
  });

  test('POST /validateWord should response with status 400 ', async () => {
    const res = await request(app).post('/api/v1/users/validateWord').send({});

    expect(res.statusCode).toEqual(400);
  });

  test('POST /validateWord should response with status 200 ', async () => {
    const res = await request(app).post('/api/v1/users/validateWord').send({
      username: 'oscarpeglez1',
      word: 'afilo',
    });

    expect(res.statusCode).toEqual(200);
  });

  test('POST /validateWord should response with 400 ', async () => {
    const res = await request(app).post('/api/v1/users/validateWord').send({
      username: 'oscarpeglez1',
      word: 'afiloaaaaaaa',
    });

    expect(res.statusCode).toEqual(400);
  });

  test('GET /:idUser/statistics should response with status 400 ', async () => {
    const res = await request(app).get('/api/v1/999999999/statistics').send({});

    expect(res.statusCode).toEqual(404);
  });

  test('GET /:idUser/statistics should response with status 200 ', async () => {
    const res = await request(app).get('/api/v1/users/7/statistics').send({});

    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('totalMatches');
    expect(res.text).toContain('totalWins');
  });

  test('GET /getTopUsers should response with status 200 ', async () => {
    const res = await request(app).get('/api/v1/users/getTopUsers').send({});

    expect(res.statusCode).toEqual(200);
  });
});
