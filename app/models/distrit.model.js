const sql = require('./db.js');

// Constructor.
const Distrit = function(distrit){};

Distrit.getAll = result =>
{
    sql.query("SELECT dis.distrito_id, dis.distrito_nombre FROM distritos as dis ORDER BY dis.distrito_id", (err, res) =>
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

module.exports = Distrit;