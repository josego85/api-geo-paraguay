const sql = require('./db.js');

// Constructor.
const City = function(city){};

City.getAll = result =>
{
    sql.query("SELECT c.ciudad_nombre FROM ciudades as c ORDER BY c.ciudad_id", (err, res) =>
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

module.exports = City;