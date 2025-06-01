const db = require('../../app/models/db');

const testDepartments = [
  {
    id: 1,
    name: 'Central',
    capital_name: 'Areguá',
  },
  {
    id: 2,
    name: 'Alto Paraná',
    capital_name: 'Ciudad del Este',
  },
  {
    id: 3,
    name: 'Itapúa',
    capital_name: 'Encarnación',
  },
];

const seedDepartments = async () => {
  try {
    const [results] = await db.query('SELECT COUNT(*) as count FROM department');
    if (results[0].count === 0) {
      throw new Error(
        'No test data available in the "departments" table. Please ensure the database is seeded.',
      );
    }
  } catch (error) {
    console.error('Error verifying departments data:', error);
    throw error;
  }
};

module.exports = {
  testDepartments,
  seedDepartments,
};
