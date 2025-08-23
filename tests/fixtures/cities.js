const db = require('../../src/app/models/db');

const testCities = [
  {
    id: 1,
    name: 'Asunción',
    geom: 'POINT(-57.3333 -25.2867)',
  },
  {
    id: 2,
    name: 'Concepción',
    geom: 'POINT(-54.6167 -25.5167)',
  },
  {
    id: 3,
    name: 'Belén',
    geom: 'POINT(-55.8667 -27.3333)',
  },
];

const seedCities = async () => {
  try {
    const [results] = await db.query('SELECT COUNT(*) as count FROM city');
    if (results[0].count === 0) {
      throw new Error(
        'No test data available in the "city" table. Please ensure the database is seeded.',
      );
    }
  } catch (error) {
    console.error('Error verifying cities data:', error);
    throw error;
  }
};

module.exports = {
  testCities,
  seedCities,
};
