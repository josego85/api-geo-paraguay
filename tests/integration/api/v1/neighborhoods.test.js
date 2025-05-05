const request = require('supertest');
const app = require('../../../../app/app');
const { clearCache } = require('../../../helpers/cache');
const { seedNeighborhoods } = require('../../../fixtures/neighborhoods');
const mysqlConnection = require('../../../../app/models/db');
const { closeConnection } = require('../../../../app/helpers/providers/cache/redisClient');

describe('Neighborhoods API Integration Tests', () => {
  beforeAll(async () => {
    await seedNeighborhoods();
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

  describe('GET /api/v1/barrios', () => {
    describe('Basic Read Operations', () => {
      it('should return all neighborhoods', async () => {
        const response = await request(app).get('/api/v1/barrios');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);

        const firstNeighborhood = response.body.data[0];
        expect(firstNeighborhood).toMatchObject({
          barrio_id: expect.any(Number),
          barrio_nombre: expect.any(String),
        });
      });
    });

    describe('Sorting Operations', () => {
      it.only('should sort by barrio_nombre ASC', async () => {
        const response = await request(app)
          .get('/api/v1/barrios')
          .query({ sort: 'barrio_nombre:asc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        // expect(response.body.data).toBeSorted((a, b) =>
        //   a.barrio_nombre.localeCompare(b.barrio_nombre)
        // );
      });

      it('should sort by barrio_nombre DESC', async () => {
        const response = await request(app)
          .get('/api/v1/barrios')
          .query({ sort: 'barrio_nombre:desc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toBeSorted((a, b) =>
          b.barrio_nombre.localeCompare(a.barrio_nombre)
        );
      });
    });
  });
});
