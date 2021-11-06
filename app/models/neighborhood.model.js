"use strict";

const sql = require('./db.js');

// Constructor.
const Neighborhood = function(neighborhood){};

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

module.exports = Neighborhood;