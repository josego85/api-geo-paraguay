const sql = require("./db.js");

// Constructor.
const Department = function(customer)
{
    // this.email = customer.email;
    // this.name = customer.name;
    // this.active = customer.active;
};

Department.findByLngLat = (req, result) =>
{
    let lng = req.lng;
    let lat = req.lat;

    sql.query('SELECT dep.departamento_nombre, dep.departamento_capital, dis.distrito_nombre, ciu.ciudad_nombre,ba.barrio_nombre ' +
      '  FROM departamentos dep LEFT JOIN distritos dis ' +
      '  ON ST_Contains(dis.geom, ST_GeomFromText("POINT(' + lng + ' ' + lat + ')",1))' +
      '  LEFT JOIN ciudades ciu ON ST_Contains(ciu.geom, ST_GeomFromText("POINT(' + lng + ' ' + lat + ')",1))' +
      '  LEFT JOIN barrios ba ON ST_Contains(ba.geom, ST_GeomFromText("POINT(' + lng + ' ' + lat + ')",1))' +
      '  WHERE ST_Contains(dep.geom, ST_GeomFromText("POINT(' + lng + ' ' + lat + ')",1)) AND ST_Contains(ciu.geom, ST_GeomFromText("POINT(' + lng + ' ' + lat + ')",1))' +
      ' AND ST_Contains(ciu.geom, ST_GeomFromText("POINT(' + lng + ' ' + lat + ')",1))', (err, res) =>
    {
        if (err)
        {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        if (res.length) 
        {
            console.log("found department: ", res[0]);
            result(null, res[0]);
            return;
        }

        // Not found Department with the longitude and the latitude.
        result({ kind: "not_found" }, null);
  });
};

Department.getAll = result =>
{
    sql.query("SELECT d.departamento_id, d.departamento_nombre, d.departamento_capital FROM departamentos as d ORDER BY d.departamento_id", (err, res) =>
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

module.exports = Department;