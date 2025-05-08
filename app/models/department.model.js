const dbConfig = require('config/db.config');
const pool = require('./db');

const { SRID } = dbConfig;

class Department {
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
