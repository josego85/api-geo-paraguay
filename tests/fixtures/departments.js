const db = require('../../app/models/db');

const testDepartments = [
  { departamento_id: 1, departamento_nombre: 'Central', departamento_capital: 'Areguá' },
  { departamento_id: 2, departamento_nombre: 'Alto Paraná', departamento_capital: 'Ciudad del Este' },
  { departamento_id: 3, departamento_nombre: 'Itapúa', departamento_capital: 'Encarnación' },
];

const seedDepartments = async () => {
  try {
    const [results] = await db.query('SELECT COUNT(*) as count FROM departamentos');
    if (results[0].count === 0) {
      throw new Error('No test data available in the "departamentos" table. Please ensure the database is seeded.');
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
