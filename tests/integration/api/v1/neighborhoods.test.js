const request = require('supertest');
const app = require('../../../../app/app');
const { seedNeighborhoods } = require('../../../fixtures/neighborhoods');
const mysqlConnection = require('../../../../app/models/db');
const { closeConnection } = require('../../../../app/helpers/providers/cache/redisClient');

describe('Neighborhoods API Integration Tests', () => {
  beforeAll(async () => {
    await seedNeighborhoods();
  });

  afterAll(async () => {
    await closeConnection();

    if (mysqlConnection) {
      await mysqlConnection.end();
    }
  });

  describe('GET /api/v1/neighborhoods', () => {
    describe('Basic Read Operations', () => {
      it('should return all neighborhoods', async () => {
        const response = await request(app).get('/api/v1/neighborhoods');

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);

        const firstNeighborhood = response.body.data[0];
        expect(firstNeighborhood).toMatchObject({
          id: expect.any(Number),
          name: expect.any(String),
        });
      });
    });

    describe('Sorting Operations', () => {
      it('should sort by name ASC', async () => {
        const response = await request(app)
          .get('/api/v1/neighborhoods')
          .query({ sort: 'name:asc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        // expect(response.body.data).toBeSorted((a, b) =>
        //   a.name.localeCompare(b.name)
        // );
      });

      it('should sort by name DESC', async () => {
        const response = await request(app)
          .get('/api/v1/neighborhoods')
          .query({ sort: 'name:desc' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('data');
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data).toBeSorted((a, b) => b.name.localeCompare(a.name));
      });
    });
  });
});
