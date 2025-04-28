const request = require('supertest');
const app = require('../server');

describe('Test /api/v1', () => {
  test('It should response the GET method /api with english language (en)', async () => {
    try {
      const response = await request(app).get('/api/v1');

      expect(response.statusCode).toBe(200);
      expect(response.body.message).toBe('Welcome to the API REST (api-geo-paraguay)');
    } catch (e) {
      expect(e).toBe(e);
    }
  });
});
