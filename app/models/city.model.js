const sql = require('./db.js');

// Constructor.
const City = function(city){};

City.getAll = result =>
{
    sql.query("SELECT c.ciudad_id, c.ciudad_nombre FROM ciudades as c ORDER BY c.ciudad_id", 
      (error, response) =>{
        if (error)
        {
            console.log("error: ", error);
            result(null, error);

            return;
        }

        result(null, response);
    });
};

module.exports = City;