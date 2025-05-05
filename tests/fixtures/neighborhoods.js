const db = require('../../app/models/db');

const testNeighborhoods = [
  { barrio_id: 1, barrio_nombre: 'San Roque', geom: 'POINT(-57.3333 -25.2867)' },
  { barrio_id: 2, barrio_nombre: 'Centro', geom: 'POINT(-54.6167 -25.5167)' },
  { barrio_id: 3, barrio_nombre: 'Chaipé', geom: 'POINT(-55.8667 -27.3333)' },
];

const seedNeighborhoods = async () => {
  try {
    const [results] = await db.query('SELECT COUNT(*) as count FROM barrios');
    if (results[0].count === 0) {
      throw new Error('No test data available in the "barrios" table. Please ensure the database is seeded.');
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
