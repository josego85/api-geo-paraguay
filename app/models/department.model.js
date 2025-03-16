const dbConfig = require('config/db.config');
const sql = require('./db');

const { SRID } = dbConfig;
const Department = function () {
  // Constructor.
};

Department.getAll = (result) => {
  sql.query(
    'SELECT dep.departamento_id, dep.departamento_nombre, dep.departamento_capital FROM departamentos as dep ORDER BY dep.departamento_id',
    (error, response) => {
      if (error) {
        console.log('error: ', error);
        result(null, error);

        return;
      }

      result(null, response);
    }
  );
};

Department.findByLngLat = (request, result) => {
  const { lng } = request;
  const { lat } = request;

  sql.query(
    `SELECT dep.departamento_nombre, dep.departamento_capital,
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
      ${lng} ${lat})",${SRID}))`,
    (error, response) => {
      if (error) {
        console.log('error: ', error);
        result(error, null);

        return;
      }

      if (response.length) {
        result(null, response[0]);

        return;
      }

      // Not found Department with the longitude
      // and the latitude.
      result({ kind: 'not_found' }, null);
    }
  );
};

Department.findById = (request, result) => {
  const { id } = request;
  const query = `SELECT dep.departamento_id, dep.departamento_nombre,
    dep.departamento_capital
    FROM departamentos dep
    WHERE dep.departamento_id = ?
  `;

  sql.query(query, [id], (error, response) => {
    if (error) {
      console.log('error: ', error);
      result(error, null);

      return;
    }

    if (response.length) {
      result(null, response[0]);

      return;
    }

    // Not found Department with the id.
    result({ kind: 'not_found' }, null);
  });
};

module.exports = Department;
