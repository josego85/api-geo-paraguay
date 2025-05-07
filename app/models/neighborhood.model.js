// const dbConfig = require('config/db.config');
const pool = require('./db');

// const { SRID_TRANSFORM } = dbConfig;

class Neighborhood {
  static async findAll({ page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', ...filter }) {
    try {
      let query = 'SELECT ne.id, ne.name FROM neighborhood as ne';
      const params = [];

      // Apply filters
      const filterConditions = [];
      if (filter.name) {
        filterConditions.push(`ne.name LIKE ?`);
        params.push(`%${filter.name}%`);
      }

      if (filterConditions.length > 0) {
        query += ` WHERE ${filterConditions.join(' AND ')}`;
      }

      // Apply sorting
      query += ` ORDER BY ${sortField} ${sortOrder}`;

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
      const query = `SELECT ne.id, ne.name
        FROM neighborhood ne
        WHERE ne.id = ?
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
//         FROM barrios as ne
//         WHERE ne.barrio_nombre = '${neighborhood}'
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
