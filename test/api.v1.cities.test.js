const request = require('supertest');
const app = require('../server');

describe('🟢 City API - Version 1', () => {

  test('✅ Should return data for city Aregua', async () => {
    const response = await request(app).get('/api/v1/ciudades/Aregua');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('latitude');
    expect(response.body.data).toHaveProperty('longitude');

    expect.assertions(5);
  });

  describe('🔹 GET /api/v1/ciudades/', () => {
    test('✅ Should return a list of cities', async () => {
      const response = await request(app).get('/api/v1/ciudades/');

      expect(response.statusCode).toBe(200);
      expect(response.type).toEqual('application/json');
      expect(response.header['content-type']).toEqual('application/json; charset=utf-8');
      expect(response.body.success).toBe(true);
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);

      const firstCity = response.body.data[0];
      expect(firstCity).toHaveProperty('ciudad_id');
      expect(firstCity).toHaveProperty('ciudad_nombre');

      expect(typeof firstCity.ciudad_nombre).toBe('string');
      expect(firstCity.ciudad_nombre.length).toBeGreaterThan(0);

      expect.assertions(11);
    });
  });

});
