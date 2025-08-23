const db = require('../../src/app/models/db');

const testDistricts = [
  {
    id: 1,
    name: 'Bella Vista',
    geom: 'POINT(-57.3333 -25.2867)',
  },
  {
    id: 2,
    name: 'Capitán Bado',
    geom: 'POINT(-54.6167 -25.5167)',
  },
  {
    id: 3,
    name: 'Zanja Pytã',
    geom: 'POINT(-55.8667 -27.3333)',
  },
];

const seedDistricts = async () => {
  try {
    const [results] = await db.query('SELECT COUNT(*) as count FROM district');
    if (results[0].count === 0) {
      throw new Error(
        'No test data available in the "district" table. Please ensure the database is seeded.',
      );
    }
  } catch (error) {
    console.error('Error verifying districts data:', error);
    throw error;
  }
};

module.exports = {
  testDistricts,
  seedDistricts,
};
