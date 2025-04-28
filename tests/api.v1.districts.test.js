const request = require('supertest');
const app = require('../server');

describe('🟢 District API - Version 1', () => {
  describe('🔹 GET /api/v1/distritos/{id}', () => {
    test('✅ Should return data for district with id 5', async () => {
      const response = await request(app).get('/api/v1/distritos/5');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('distrito_id');
      expect(response.body).toHaveProperty('distrito_nombre');

      expect.assertions(3);
    });
  });

  describe('🔹 GET /api/v1/distritos/', () => {
    test('✅ Should return a list of districts', async () => {
      const response = await request(app).get('/api/v1/distritos/');

      expect(response.statusCode).toBe(200);
      expect(response.type).toEqual('application/json');
      expect(response.header['content-type']).toEqual('application/json; charset=utf-8');
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);

      const firstDistrict = response.body.data[0];
      expect(firstDistrict).toHaveProperty('distrito_id');
      expect(firstDistrict).toHaveProperty('distrito_nombre');

      expect(typeof firstDistrict.distrito_id).toBe('number');
      expect(typeof firstDistrict.distrito_nombre).toBe('string');
      expect(firstDistrict.distrito_nombre.length).toBeGreaterThan(0);

      expect.assertions(11);
    });
  });
});
