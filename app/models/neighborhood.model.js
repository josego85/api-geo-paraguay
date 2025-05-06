// const dbConfig = require('config/db.config');
const pool = require('./db');

// const { SRID_TRANSFORM } = dbConfig;

class Neighborhood {
  static async findAll({ page = 1, limit = 10, sort = {} }) {
    try {
      let query = 'SELECT ba.barrio_id, ba.barrio_nombre FROM barrios as ba';
      const params = [];

      // Apply sorting
      if (sort.field) {
        query += ` ORDER BY ${sort.field} ${sort.order || 'ASC'}`;
      }

      // Apply pagination
      const offset = (page - 1) * limit;
      query += ` LIMIT ? OFFSET ?`;
      params.push(limit, offset);

      const [rows] = await pool.query(query, params);
      return rows;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const query = `SELECT ba.barrio_id, ba.barrio_nombre
        FROM barrios ba
        WHERE ba.barrio_id = ?
      `;
      const [rows] = await pool.query(query, [id]);

      if (rows.length) {
        return rows[0];
      }
      throw new Error('Neighborhood not found');
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }
}

// Neighborhood.getLngLat = (request, result) => {
//   const neighborhood = request.name;
//   const query = `SELECT
//         ST_X(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as latitude,
//         ST_Y(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as longitude
//         FROM barrios as ba
//         WHERE ba.barrio_nombre = '${neighborhood}'
//       `;

//   sql.query(query, (error, response) => {
//     if (error) {
//       console.log('error: ', error);
//       result(error, null);

//       return;
//     }

//     if (response.length) {
//       result(null, response[0]);

//       return;
//     }

//     // Not found neighborhood.
//     result({ kind: 'not_found' }, null);
//   });
// };

module.exports = Neighborhood;
