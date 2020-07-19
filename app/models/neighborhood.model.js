const sql = require('./db.js');

// Constructor.
const Neighborhood = function(neighborhood){};

Neighborhood.getAll = result =>
{
    sql.query("SELECT b.barrio_id, b.barrio_nombre FROM barrios as b ORDER BY b.barrio_id", (err, res) =>
    {
        if (err)
        {
            console.log("error: ", err);
            result(null, err);
            return;
        }
        result(null, res);
    });
};

module.exports = Neighborhood;