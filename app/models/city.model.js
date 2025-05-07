// const dbConfig = require('config/db.config');
const pool = require('./db');

// const { SRID_TRANSFORM } = dbConfig;

class City {
  static async findAll({ page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', ...filter }) {
    try {
      let query = `SELECT ci.id, ci.name FROM city as ci`;
      const params = [];

      // Apply filters
      const filterConditions = [];
      if (filter.name) {
        filterConditions.push(`ci.name LIKE ?`);
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
      console.log('Error: ', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const query = `SELECT ci.id, ci.name FROM city ci WHERE ci.id = ?`;
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
