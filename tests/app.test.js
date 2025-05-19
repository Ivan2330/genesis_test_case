const request = require('supertest');
const app = require('../src/app');

describe('Weather API', () => {
  it('should return weather data for a valid city', async () => {
    const res = await request(app).get('/api/weather?city=Kyiv');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('temperature');
    expect(res.body).toHaveProperty('humidity');
    expect(res.body).toHaveProperty('description');
  });

  it('should return 400 if no city is provided', async () => {
    const res = await request(app).get('/api/weather');
    expect(res.statusCode).toBe(400);
  });
});

describe('Subscribe API', () => {
  it('should reject incomplete subscription data', async () => {
    const res = await request(app)
      .post('/api/subscribe')
      .send({ email: 'test@example.com' });
    expect(res.statusCode).toBe(400);
  });

  it('should accept valid subscription data', async () => {
    const res = await request(app)
      .post('/api/subscribe')
      .type('form')
      .send({
        email: `test${Date.now()}@example.com`,
        city: 'Kyiv',
        frequency: 'daily'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });
});
