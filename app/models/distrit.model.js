const dbConfig = require('config/db.config');
const sql = require('./db');

const { SRID_TRANSFORM } = dbConfig;
const Distrit = function () {
  // Constructor.
};

Distrit.getAll = (result) => {
  sql.query(
    'SELECT dis.distrito_id, dis.distrito_nombre FROM distritos as dis ORDER BY dis.distrito_id',
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

Distrit.getLngLat = (request, result) => {
  const distrit = request.name;
  const query = `SELECT 
        ST_X(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as latitude,
        ST_Y(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as longitude 
        FROM distritos 
        WHERE distrito_nombre = '${distrit}'
      `;

  sql.query(query, (error, response) => {
    if (error) {
      console.log('error: ', error);
      result(error, null);

      return;
    }

    if (response.length) {
      // console.log('found longitude latitude distrit: ', response[0])
      result(null, response[0]);

      return;
    }

    // Not found distrit.
    result({ kind: 'not_found' }, null);
  });
};

module.exports = Distrit;
