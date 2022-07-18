/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import AppDateSource from '../db';
import app from '../app';

describe('PATH /api/v1/words', () => {
  beforeAll(async () => {
    await AppDateSource.initialize();
  });

  afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await AppDateSource.destroy();
  });

  test('POST / Create word should response with status code 400', async () => {
    const res = await request(app).post('/api/v1/words').send({});

    expect(res.statusCode).toEqual(400);
  });

  test('GET / Get current word should response with status code 200', async () => {
    const res = await request(app).get('/api/v1/words/getCurrent').send({});

    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('value');
    expect(res.text).toContain('isCurrent');
    expect(res.text).toContain('true');
  });

  test('GET / Get most Guessed word should response with status code 200', async () => {
    const res = await request(app).get('/api/v1/words/mostGuessedWord').send({});

    expect(res.statusCode).toEqual(200);
    expect(res.text).toContain('word');
    expect(res.text).toContain('totalGuessed');
  });
});
