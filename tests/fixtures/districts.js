const db = require('../../app/models/db');

const testDistricts = [
  { distrito_id: 1, distrito_nombre: 'Bella Vista', geom: 'POINT(-57.3333 -25.2867)' },
  { distrito_id: 2, distrito_nombre: 'Capitán Bado', geom: 'POINT(-54.6167 -25.5167)' },
  { distrito_id: 3, distrito_nombre: 'Zanja Pytã', geom: 'POINT(-55.8667 -27.3333)' },
];

const seedDistricts = async () => {
  try {
    const [results] = await db.query('SELECT COUNT(*) as count FROM distritos');
    if (results[0].count === 0) {
      throw new Error('No test data available in the "distritos" table. Please ensure the database is seeded.');
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
