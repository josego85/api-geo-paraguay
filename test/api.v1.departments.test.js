const request = require('supertest');
const app = require('../server');

describe('🟢 Department API - Version 1', () => {
  describe('🔹 GET /api/v1/departamentos/{id}', () => {
    test('✅ Should return data for department 1', async () => {
      const response = await request(app).get('/api/v1/departamentos/1');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('departamento_id');
      expect(response.body).toHaveProperty('departamento_nombre');
      expect(response.body).toHaveProperty('departamento_capital');

      expect.assertions(4);
    });
  });

  describe('🔹 GET /api/v1/departamentos/', () => {
    test('✅ Should return a list of departments', async () => {
      const response = await request(app).get('/api/v1/departamentos/');

      expect(response.statusCode).toBe(200);
      expect(response.type).toEqual('application/json');
      expect(response.header['content-type']).toEqual('application/json; charset=utf-8');
      expect(response.body.data).toBeDefined();
      expect(Array.isArray(response.body.data)).toBe(true);
      expect(response.body.data.length).toBeGreaterThan(0);

      const firstDepartment = response.body.data[0];
      expect(firstDepartment).toHaveProperty('departamento_id');
      expect(firstDepartment).toHaveProperty('departamento_nombre');
      expect(firstDepartment).toHaveProperty('departamento_capital');

      expect(typeof firstDepartment.departamento_id).toBe('number');
      expect(typeof firstDepartment.departamento_nombre).toBe('string');
      expect(typeof firstDepartment.departamento_capital).toBe('string');
      expect(firstDepartment.departamento_nombre.length).toBeGreaterThan(0);

      expect.assertions(13);
    });
  });
});
