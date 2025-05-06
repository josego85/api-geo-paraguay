const request = require('supertest');
const app = require('../../../../app/app');
const { seedDistricts } = require('../../../fixtures/districts');
const mysqlConnection = require('../../../../app/models/db');
const { closeConnection } = require('../../../../app/helpers/providers/cache/redisClient');

describe('Districts API Integration Tests', () => {
  beforeAll(async () => {
    await seedDistricts();
  });

  afterAll(async () => {
    await closeConnection();

    if (mysqlConnection) {
      await mysqlConnection.end();
    }
  });

  describe('GET /api/v1/districts', () => {
    describe('Basic Read Operations', () => {
      it('should return all districts', async () => {
        const response = await request(app).get('/api/v1/districts');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);

        const firstDistrict = response.body.data[0];
        expect(firstDistrict).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
        });
      });
    });

    describe('Sorting Operations', () => {
      it('should sort by name ASC', async () => {
        const response = await request(app)
          .get('/api/v1/districts')
          .query({ sortField: 'name', sortOrder: 'asc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toBeSorted((a, b) => a.name.localeCompare(b.name));
      });

      it('should sort by name DESC', async () => {
        const response = await request(app)
          .get('/api/v1/districts')
          .query({ sortField: 'name', sortOrder: 'desc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toBeSorted((a, b) => b.name.localeCompare(a.name));
      });
    });
  });
});
