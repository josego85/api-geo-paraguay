const dbConfig = require('config/db.config');
const sql = require('./db');

const { SRID_TRANSFORM } = dbConfig;
const City = function () {
  // Constructor.
};

City.getAll = () =>
  new Promise((resolve, reject) => {
    sql.query(
      'SELECT ci.ciudad_id, ci.ciudad_nombre FROM ciudades as ci ORDER BY ci.ciudad_id',
      (error, response) => {
        if (error) {
          console.log('error: ', error);
          reject(error);

          return;
        }

        resolve(response);
      }
    );
  });

City.getLngLat = (request, result) => {
  const city = request.name;
  const query = `SELECT 
        ST_X(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as latitude,
        ST_Y(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as longitude 
        FROM ciudades as ci
        WHERE ci.ciudad_nombre = '${city}'
      `;

  sql.query(query, (error, response) => {
    if (error) {
      console.log('error: ', error);
      result(error, null);

      return;
    }

    if (response.length) {
      result(null, response[0]);

      return;
    }

    // Not found city.
    result({ kind: 'not_found' }, null);
  });
};

City.findById = (id) =>
  new Promise((resolve, reject) => {
    const query = `SELECT ci.ciudad_id, ci.ciudad_nombre FROM ciudades ci WHERE ci.ciudad_id = ?`;

    sql.query(query, [id], (error, response) => {
      if (error) {
        console.log('error: ', error);
        reject(error);
        return;
      }

      if (response.length) {
        resolve(response[0]);
      } else {
        reject(new Error('City not found'));
      }
    });
  });

module.exports = City;
