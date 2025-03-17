const request = require('supertest');
const app = require('../server');

describe('🟢 Neighborhood API - Version 1', () => {
  describe('🔹 GET /api/v1/barrios/{id}', () => {
    test('✅ Should return data for Neighborhood with id 12', async () => {
      const response = await request(app).get('/api/v1/barrios/12');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('barrio_id');
      expect(response.body).toHaveProperty('barrio_nombre');

      expect.assertions(3);
    });
  });

  describe('🔹 GET /api/v1/barrios/', () => {
    test('✅ Should return a list of neighborhoods', async () => {
      const response = await request(app).get('/api/v1/barrios/');

      expect(response.statusCode).toBe(200);
      expect(response.type).toEqual('application/json');
      expect(response.header['content-type']).toEqual('application/json; charset=utf-8');
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);

      const firstNeighborhood = response.body.data[0];
      expect(firstNeighborhood).toHaveProperty('barrio_id');
      expect(firstNeighborhood).toHaveProperty('barrio_nombre');

      expect(typeof firstNeighborhood.barrio_id).toBe('number');
      expect(typeof firstNeighborhood.barrio_nombre).toBe('string');
      expect(firstNeighborhood.barrio_nombre.length).toBeGreaterThan(0);

      expect.assertions(11);
    });
  });
});
