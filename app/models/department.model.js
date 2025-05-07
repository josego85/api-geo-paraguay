const dbConfig = require('config/db.config');
const pool = require('./db');

const { SRID } = dbConfig;

class Department {
  static async findAll({ page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', ...filter }) {
    try {
      let query = 'SELECT dep.id, dep.name, dep.capital_name FROM department as dep';
      const params = [];

      // Apply filters
      const filterConditions = [];
      if (filter.name) {
        filterConditions.push(`dep.name LIKE ?`);
        params.push(`%${filter.name}%`);
      }

      if (filter.capital_name) {
        filterConditions.push(`dep.capital_name LIKE ?`);
        params.push(`%${filter.capital_name}%`);
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
      console.error('error:', error);
      throw error;
    }
  }

  static async findById(id) {
    const query = `SELECT dep.id, dep.name,
      dep.capital_name
      FROM department dep
      WHERE dep.id = ?
    `;
    try {
      const [rows] = await pool.query(query, [id]);
      if (rows && rows.length > 0) {
        return rows[0];
      }
      throw new Error('Department not found');
    } catch (error) {
      console.error('Error in Department.findById:', error);
      throw error;
    }
  }

  static async findByLngLat(lng, lat) {
    const query = `SELECT dep.name, dep.capital_name,
        dis.name, ciu.name, ba.name
        FROM department dep LEFT JOIN district dis
        ON ST_Contains(dis.geom, ST_GeomFromText("POINT(
        ${lng} ${lat})",${SRID})) LEFT JOIN city ciu
        ON ST_Contains(ciu.geom, ST_GeomFromText("POINT(
        ${lng} ${lat})",${SRID})) LEFT JOIN neighborhood ba
        ON ST_Contains(ba.geom, ST_GeomFromText("POINT(
        ${lng} ${lat})",${SRID})) WHERE
        ST_Contains(dep.geom, ST_GeomFromText("POINT(
        ${lng} ${lat})",${SRID})) AND ST_Contains(ciu.geom,
        ST_GeomFromText("POINT(${lng} ${lat})",${SRID}))
        AND ST_Contains(ciu.geom, ST_GeomFromText("POINT(
        ${lng} ${lat})",${SRID}))`;

    try {
      const [rows] = await pool.query(query);
      if (rows && rows.length > 0) {
        return rows[0];
      }
      throw new Error('Department not found');
    } catch (error) {
      console.error('error:', error);
      throw error;
    }
  }
}

module.exports = Department;
