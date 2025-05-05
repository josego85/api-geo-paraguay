const request = require('supertest');
const app = require('../../../../app/app');
const { clearCache } = require('../../../helpers/cache');
const { seedCities } = require('../../../fixtures/cities');
const mysqlConnection = require('../../../../app/models/db');
const { closeConnection } = require('../../../../app/helpers/providers/cache/redisClient');

describe('Cities API Integration Tests', () => {
  beforeAll(async () => {
    await seedCities();
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

  describe('GET /api/v1/ciudades', () => {
    describe('Basic Read Operations', () => {
      it('should return all cities with correct pagination structure', async () => {
        const response = await request(app).get('/api/v1/ciudades');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);

        const firstCity = response.body.data[0];
        expect(firstCity).toMatchObject({
          ciudad_id: expect.any(Number),
          ciudad_nombre: expect.any(String),
        });
      });
    });

    describe('Sorting Operations', () => {
      it('should sort by ciudad_nombre ASC', async () => {
        const response = await request(app)
          .get('/api/v1/ciudades')
          .query({ sort: 'ciudad_nombre:asc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toBeSorted((a, b) =>
          a.ciudad_nombre.localeCompare(b.ciudad_nombre)
        );
      });

      it('should sort by ciudad_nombre DESC', async () => {
        const response = await request(app)
          .get('/api/v1/ciudades')
          .query({ sort: 'ciudad_nombre:desc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toBeSorted((a, b) =>
          b.ciudad_nombre.localeCompare(a.ciudad_nombre)
        );
      });
    });
  });
});
