"use strict";

const sql = require('./db.js');
const Neighborhood = function(neighborhood){
    // Constructor.
};

Neighborhood.getAll = result =>
{
    sql.query("SELECT b.barrio_id, b.barrio_nombre FROM barrios as b ORDER BY b.barrio_id", 
      (error, response) => {
        if (error)
        {
            console.log("error: ", error);
            result(null, error);

            return;
        }
        
        result(null, response);
    });
};

Neighborhood.getLngLat = (request, result) =>
{
    let neighborhood = request.name;
    let query        = `SELECT ST_X(ST_Centroid(geom)) as latitude,` +
      `ST_Y(ST_Centroid(geom)) as longitude FROM barrios ` +
      `WHERE barrio_nombre = '${neighborhood}'`;

    sql.query(query,
        (error, response) =>
    {
        if (error)
        {
            console.log("error: ", error);
            result(error, null);

            return;
        }

        if (response.length) 
        {
            console.log("found longitude latitude neighborhood: ", response[0]);
            result(null, response[0]);

            return;
        }

        // Not found neighborhood.
        result({ kind: "not_found" }, null);
    });
};

module.exports = Neighborhood;