const dbConfig = require('config/db.config');
const pool = require('./db');

const { SRID_TRANSFORM } = dbConfig;

class District {
  static async getAll() {
    try {
      const query =
        'SELECT dis.distrito_id, dis.distrito_nombre FROM distritos as dis ORDER BY dis.distrito_id';
      const [rows] = await pool.query(query);

      return rows;
    } catch (error) {
      console.error('Error: ', error);

      throw error;
    }
  }

  static async findById(id) {
    try {
      const query = `SELECT dis.distrito_id, dis.distrito_nombre
      FROM distritos dis
      WHERE dis.distrito_id = ?
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
//         FROM distritos as dis
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
