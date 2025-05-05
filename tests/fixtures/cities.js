const db = require('../../app/models/db');

const testCities = [
  { ciudad_id: 1, ciudad_nombre: 'Asunción', barrio_nombre: 'Centro', geom: 'POINT(-57.3333 -25.2867)' },
  { ciudad_id: 2, ciudad_nombre: 'Concepción', barrio_nombre: 'San Roque', geom: 'POINT(-54.6167 -25.5167)' },
  { ciudad_id: 3, ciudad_nombre: 'Belén', barrio_nombre: 'Santa Ana', geom: 'POINT(-55.8667 -27.3333)' },
];

const seedCities = async () => {
  try {
    const [results] = await db.query('SELECT COUNT(*) as count FROM ciudades');
    if (results[0].count === 0) {
      throw new Error('No test data available in the "ciudades" table. Please ensure the database is seeded.');
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
