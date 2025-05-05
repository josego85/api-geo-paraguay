const request = require('supertest');
const app = require('../../../../app/app');
const { clearCache } = require('../../../helpers/cache');
const { seedDistricts } = require('../../../fixtures/districts');
const mysqlConnection = require('../../../../app/models/db');
const { closeConnection } = require('../../../../app/helpers/providers/cache/redisClient');

describe('Districts API Integration Tests', () => {
  beforeAll(async () => {
    await seedDistricts();
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

  describe('GET /api/v1/distritos', () => {
    describe('Basic Read Operations', () => {
      it('should return all districts', async () => {
        const response = await request(app).get('/api/v1/distritos');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);

        const firstDistrict = response.body.data[0];
        expect(firstDistrict).toMatchObject({
          distrito_id: expect.any(Number),
          distrito_nombre: expect.any(String),
        });
      });
    });

    describe('Sorting Operations', () => {
      it('should sort by distrito_nombre ASC', async () => {
        const response = await request(app)
          .get('/api/v1/distritos')
          .query({ sort: 'distrito_nombre:asc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toBeSorted((a, b) =>
          a.distrito_nombre.localeCompare(b.distrito_nombre)
        );
      });

      it('should sort by distrito_nombre DESC', async () => {
        const response = await request(app)
          .get('/api/v1/distritos')
          .query({ sort: 'distrito_nombre:desc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toBeSorted((a, b) =>
          b.distrito_nombre.localeCompare(a.distrito_nombre)
        );
      });
    });
  });
});
