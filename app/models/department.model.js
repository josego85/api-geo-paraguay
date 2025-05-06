const dbConfig = require('config/db.config');
const pool = require('./db');

const { SRID } = dbConfig;

class Department {
  static async findAll({ page = 1, limit = 10, sort = {} }) {
    try {
      let query =
        'SELECT dep.departamento_id, dep.departamento_nombre, dep.departamento_capital FROM departamentos as dep';
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
      console.error('error:', error);
      throw error;
    }
  }

  static async findById(id) {
    const query = `SELECT dep.departamento_id, dep.departamento_nombre,
      dep.departamento_capital
      FROM departamentos dep
      WHERE dep.departamento_id = ?
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
    const query = `SELECT dep.departamento_nombre, dep.departamento_capital,
        dis.distrito_nombre, ciu.ciudad_nombre,ba.barrio_nombre
        FROM departamentos dep LEFT JOIN distritos dis
        ON ST_Contains(dis.geom, ST_GeomFromText("POINT(
        ${lng} ${lat})",${SRID})) LEFT JOIN ciudades ciu
        ON ST_Contains(ciu.geom, ST_GeomFromText("POINT(
        ${lng} ${lat})",${SRID})) LEFT JOIN barrios ba
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
