// const dbConfig = require('config/db.config');
const pool = require('./db');

// const { SRID_TRANSFORM } = dbConfig;

class District {
  static async findAll({ page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', ...filter }) {
    try {
      let query = 'SELECT dis.id, dis.name FROM district as dis';
      const params = [];

      // Apply filters
      const filterConditions = [];
      if (filter.name) {
        filterConditions.push(`dis.name LIKE ?`);
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
      console.error('Error: ', error);

      throw error;
    }
  }

  static async findById(id) {
    try {
      const query = `SELECT dis.id, dis.name
      FROM district dis
      WHERE dis.id = ?
    `;
      const [rows] = await pool.query(query, [id]);

      if (rows.length) {
        return rows[0];
      }

      throw new Error('District not found');
    } catch (error) {
      console.error('Error: ', error);

      throw error;
    }
  }
}

// District.getLngLat = (request, result) => {
//   const district = request.name;
//   const query = `SELECT
//         ST_X(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as latitude,
//         ST_Y(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as longitude
//         FROM district as dis
//         WHERE dis.distrito_nombre = '${district}'
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

//     // Not found district.
//     result({ kind: 'not_found' }, null);
//   });
// };

module.exports = District;
