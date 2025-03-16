const dbConfig = require('config/db.config');
const sql = require('./db');

const { SRID_TRANSFORM } = dbConfig;
const District = function () {
  // Constructor.
};

District.getAll = () =>
  new Promise((resolve, reject) => {
    sql.query(
      'SELECT dis.distrito_id, dis.distrito_nombre FROM distritos as dis ORDER BY dis.distrito_id',
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

District.getLngLat = (request, result) => {
  const district = request.name;
  const query = `SELECT 
        ST_X(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as latitude,
        ST_Y(ST_Centroid(ST_Transform(geom, ${SRID_TRANSFORM}))) as longitude 
        FROM distritos as dis
        WHERE dis.distrito_nombre = '${district}'
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

    // Not found district.
    result({ kind: 'not_found' }, null);
  });
};

District.findById = (id) =>
  new Promise((resolve, reject) => {
    const query = `SELECT dis.distrito_id, dis.distrito_nombre
      FROM distritos dis
      WHERE dis.distrito_id = ?
    `;

    sql.query(query, [id], (error, response) => {
      if (error) {
        console.log('error: ', error);
        reject(error);

        return;
      }

      if (response.length) {
        resolve(response[0]);
      } else {
        reject(new Error('District not found'));
      }
    });
  });

module.exports = District;
