const request = require('supertest');
const app = require('../../../../app/app');
const { seedCities } = require('../../../fixtures/cities');
const mysqlConnection = require('../../../../app/models/db');
const { closeConnection } = require('../../../../app/helpers/providers/cache/redisClient');

describe('Cities API Integration Tests', () => {
  beforeAll(async () => {
    await seedCities();
  });

  afterAll(async () => {
    await closeConnection();

    if (mysqlConnection) {
      await mysqlConnection.end();
    }
  });

  describe('GET /api/v1/cities', () => {
    describe('Basic Read Operations', () => {
      it('should return all cities with correct pagination structure', async () => {
        const response = await request(app).get('/api/v1/cities');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);

        const firstCity = response.body.data[0];
        expect(firstCity).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
        });
      });
    });

    describe('Sorting Operations', () => {
      it('should sort by name ASC', async () => {
        const response = await request(app)
          .get('/api/v1/cities')
          .query({ sortField: 'name', sortOrder: 'asc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toBeSorted((a, b) => a.name.localeCompare(b.name));
      });

      it('should sort by name DESC', async () => {
        const response = await request(app)
          .get('/api/v1/cities')
          .query({ sortField: 'name', sortOrder: 'desc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toBeSorted((a, b) => b.name.localeCompare(a.name));
      });
    });
  });
});
