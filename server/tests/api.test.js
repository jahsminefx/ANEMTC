const request = require('supertest');
const app = require('../src/app');

describe('Aninta Therapy Center Backend API Tests', () => {
  test('GET /api/health returns healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.status).toBe('healthy');
  });

  test('GET /api/settings returns default public site settings', async () => {
    const res = await request(app).get('/api/settings');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('GET /api/products returns products list array', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('GET /api/services returns services array', async () => {
    const res = await request(app).get('/api/services');
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  test('POST /api/newsletter/subscribe validates input email', async () => {
    const res = await request(app)
      .post('/api/newsletter/subscribe')
      .send({ firstName: 'Test', email: 'invalid-email-format' });
    expect(res.statusCode).toBe(400);
    expect(res.body.success).toBe(false);
  });

  test('POST /api/newsletter/subscribe handles honeypot anti-spam', async () => {
    const res = await request(app)
      .post('/api/newsletter/subscribe')
      .send({ firstName: 'Bot', email: 'bot@spam.com', honeypot: 'http://spamlink.com' });
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });

  test('Protected route /api/admin/stats rejects unauthenticated requests', async () => {
    const res = await request(app).get('/api/admin/stats');
    expect(res.statusCode).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
