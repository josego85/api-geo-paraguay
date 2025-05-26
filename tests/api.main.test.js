const request = require('supertest');
const app = require('../app/app'); // Changed from ../server

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

describe('Security Headers Test /api/v1', () => {
  let response;

  beforeAll(async () => {
    response = await request(app).get('/api/v1');
  });

  test('It should return X-Content-Type-Options: nosniff', () => {
    expect(response.headers['x-content-type-options']).toEqual('nosniff');
  });

  test('It should return X-Frame-Options: DENY', () => {
    expect(response.headers['x-frame-options']).toEqual('DENY');
  });

  test('It should return Content-Security-Policy containing default-src \'self\'', () => {
    expect(response.headers['content-security-policy']).toContain("default-src 'self'");
  });

  test('It should return Permissions-Policy header', () => {
    expect(response.headers['permissions-policy']).toBeTruthy();
  });

  test('It should return Cache-Control: no-store', () => {
    expect(response.headers['cache-control']).toEqual('no-store');
  });

  test('It should return Referrer-Policy: strict-origin', () => {
    expect(response.headers['referrer-policy']).toEqual('strict-origin');
  });
});
