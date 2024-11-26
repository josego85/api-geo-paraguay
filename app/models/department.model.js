const sql = require('./db.js');
const dbConfig = require('config/db.config.js');

const { SRID } = dbConfig;
const Department = function (department) {
    // Constructor.
};

Department.getAll = (result) => {
    sql.query(
        'SELECT d.departamento_id, d.departamento_nombre, d.departamento_capital FROM departamentos as d ORDER BY d.departamento_id',
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
                // console.log('found department: ', response[0])
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

    sql.query(
        `SELECT ciu.ciudad_id, ciu.ciudad_nombre FROM departamentos dep LEFT JOIN ciudades ciu ON ST_Contains(dep.geom, ST_Centroid(ciu.geom))
    WHERE dep.departamento_id = ${id} ORDER BY ciu.ciudad_nombre ASC`,
        (error, response) => {
            if (error) {
                console.log('error: ', error);
                result(error, null);

                return;
            }

            if (response.length) {
                // console.log('found department: ', response[0])
                result(null, response);

                return;
            }

            // Not found Department with the id.
            result({ kind: 'not_found' }, null);
        }
    );
};

module.exports = Department;
