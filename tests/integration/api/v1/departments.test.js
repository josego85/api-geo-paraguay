const request = require('supertest');
const app = require('../../../../app/app');
const { clearCache } = require('../../../helpers/cache');
const { seedDepartments } = require('../../../fixtures/departments');
const mysqlConnection = require('../../../../app/models/db');
const { closeConnection } = require('../../../../app/helpers/providers/cache/redisClient');

describe('Departments API Integration Tests', () => {
  beforeAll(async () => {
    await seedDepartments();
  });

  afterEach(async () => {
    await clearCache();
  });

  afterAll(async () => {
    await closeConnection();

    if (mysqlConnection) {
      await mysqlConnection.end();
    }
  });

  describe('GET /api/v1/departamentos', () => {
    describe('Basic Read Operations', () => {
      it('should return all departments', async () => {
        const response = await request(app).get('/api/v1/departamentos');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);

        const firstDepartment = response.body.data[0];
        expect(firstDepartment).toMatchObject({
          departamento_id: expect.any(Number),
          departamento_nombre: expect.any(String),
          departamento_capital: expect.any(String),
        });
      });
    });

    describe('Sorting Operations', () => {
      it('should sort by departamento_nombre ASC', async () => {
        const response = await request(app)
          .get('/api/v1/departamentos')
          .query({ sort: 'departamento_nombre:asc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toBeSorted((a, b) =>
          a.departamento_nombre.localeCompare(b.departamento_nombre)
        );
      });

      it('should sort by departamento_nombre DESC', async () => {
        const response = await request(app)
          .get('/api/v1/departamentos')
          .query({ sort: 'departamento_nombre:desc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toBeSorted((a, b) =>
          b.departamento_nombre.localeCompare(a.departamento_nombre)
        );
      });
    });
  });
});
