// const dbConfig = require('config/db.config');
const pool = require('./db');

// const { SRID_TRANSFORM } = dbConfig;

class City {
  static async getAll(sorting = {}) {
    try {
      let query = `SELECT ci.ciudad_id, ci.ciudad_nombre FROM ciudades as ci`;

      if (sorting.field) {
        query += ` ORDER BY ${sorting.field} ${sorting.order}`;
      }
      const [rows] = await pool.query(query);
      return rows;
    } catch (error) {
      console.log('error: ', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const query = `SELECT ci.ciudad_id, ci.ciudad_nombre FROM ciudades ci WHERE ci.ciudad_id = ?`;
      const [rows] = await pool.query(query, [id]);

      if (rows.length) {
        return rows[0];
      }

      throw new Error('City not found');
    } catch (error) {
      console.log('Error: ', error);
      throw error;
    }
  }

  // City.getLngLat = (request, result) => {
  //   const city = request.name;
  //   const query = `SELECT
  //         ST_X(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as latitude,
  //         ST_Y(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as longitude
  //         FROM ciudades as ci
  //         WHERE ci.ciudad_nombre = '${city}'
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

  //     // Not found city.
  //     result({ kind: 'not_found' }, null);
  //   });
}

module.exports = City;
