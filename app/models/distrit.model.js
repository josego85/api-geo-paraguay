'use strict';

const sql = require('./db.js');
const Distrit = function (distrit) {
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
    let distrit = request.name;
    let query =
        `SELECT ST_X(ST_Centroid(geom)) as latitude,` +
        `ST_Y(ST_Centroid(geom)) as longitude FROM distritos ` +
        `WHERE distrito_nombre = '${distrit}'`;

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
