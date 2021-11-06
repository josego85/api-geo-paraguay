"use strict";

const sql = require('./db.js');

// Constructor.
const Distrit = function(distrit){};

Distrit.getAll = result =>
{
    sql.query("SELECT dis.distrito_id, dis.distrito_nombre FROM distritos as dis ORDER BY dis.distrito_id", 
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

module.exports = Distrit;