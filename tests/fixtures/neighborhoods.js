const db = require('../../app/models/db');

const testNeighborhoods = [
  {
    id: 1,
    name: 'San Roque',
    geom: 'POINT(-57.3333 -25.2867)',
  },
  {
    id: 2,
    name: 'Centro',
    geom: 'POINT(-54.6167 -25.5167)',
  },
  {
    id: 3,
    name: 'Chaipé',
    geom: 'POINT(-55.8667 -27.3333)',
  },
];

const seedNeighborhoods = async () => {
  try {
    const [results] = await db.query('SELECT COUNT(*) as count FROM neighborhood');
    if (results[0].count === 0) {
      throw new Error(
        'No test data available in the "neighborhood" table. Please ensure the database is seeded.',
      );
    }
  } catch (error) {
    console.error('Error verifying neighborhoods data:', error);
    throw error;
  }
};

module.exports = {
  testNeighborhoods,
  seedNeighborhoods,
};
