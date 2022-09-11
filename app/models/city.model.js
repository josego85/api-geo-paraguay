'use strict'

const sql = require('./db.js')
const City = function (city) {
    // Constructor.
}

City.getAll = (result) => {
    sql.query(
        'SELECT c.ciudad_id, c.ciudad_nombre FROM ciudades as c ORDER BY c.ciudad_id',
        (error, response) => {
            if (error) {
                console.log('error: ', error)
                result(null, error)

                return
            }

            result(null, response)
        }
    )
}

City.getLngLat = (request, result) => {
    let city = request.name
    let query =
        `SELECT ST_X(ST_Centroid(geom)) as latitude,` +
        `ST_Y(ST_Centroid(geom)) as longitude FROM ciudades ` +
        `WHERE ciudad_nombre = '${city}'`

    sql.query(query, (error, response) => {
        if (error) {
            console.log('error: ', error)
            result(error, null)

            return
        }

        if (response.length) {
            // console.log('found longitude latitude city: ', response[0])
            result(null, response[0])

            return
        }

        // Not found city.
        result({ kind: 'not_found' }, null)
    })
}

module.exports = City
