const dbConfig = require('config/db.config');
const sql = require('./db');

const { SRID_TRANSFORM } = dbConfig;
const Neighborhood = function () {
  // Constructor.
};

Neighborhood.getAll = (result) => {
  sql.query(
    'SELECT ba.barrio_id, ba.barrio_nombre FROM barrios as ba ORDER BY ba.barrio_id',
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

Neighborhood.getLngLat = (request, result) => {
  const neighborhood = request.name;
  const query = `SELECT 
        ST_X(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as latitude,
        ST_Y(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as longitude 
        FROM barrios as ba
        WHERE ba.barrio_nombre = '${neighborhood}'
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

    // Not found neighborhood.
    result({ kind: 'not_found' }, null);
  });
};

Neighborhood.findById = (request, result) => {
  const { id } = request;
  const query = `SELECT ba.barrio_id, ba.barrio_nombre
    FROM barrios ba
    WHERE ba.barrio_id = ?
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

    // Not found Neighborhood with the id.
    result({ kind: 'not_found' }, null);
  });
};

module.exports = Neighborhood;
