const dbConfig = require('config/db.config');
const sql = require('./db');

const { SRID_TRANSFORM } = dbConfig;
const City = function () {
  // Constructor.
};

City.getAll = (result) => {
  sql.query(
    'SELECT c.ciudad_id, c.ciudad_nombre FROM ciudades as c ORDER BY c.ciudad_id',
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

City.getLngLat = (request, result) => {
  const city = request.name;
  const query = `SELECT 
        ST_X(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as latitude,
        ST_Y(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as longitude 
        FROM ciudades 
        WHERE ciudad_nombre = '${city}'
      `;

  sql.query(query, (error, response) => {
    if (error) {
      console.log('error: ', error);
      result(error, null);

      return;
    }

    if (response.length) {
      // console.log('found longitude latitude city: ', response[0])
      result(null, response[0]);

      return;
    }

    // Not found city.
    result({ kind: 'not_found' }, null);
  });
};

module.exports = City;
