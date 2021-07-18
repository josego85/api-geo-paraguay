const sql = require('./db.js');

// Constructor.
const Department = function(department){};

Department.getAll = result =>
{
    sql.query("SELECT d.departamento_id, d.departamento_nombre, d.departamento_capital FROM departamentos as d ORDER BY d.departamento_id",
      (error, response) =>
    {
        if (error)
        {
            console.log("error: ", error);
            result(null, error);

            return;
        }

        result(null, response);
    });
};

Department.findByLngLat = (request, result) =>
{
    let lng = request.lng;
    let lat = request.lat;

    sql.query('SELECT dep.departamento_nombre, dep.departamento_capital, dis.distrito_nombre, ciu.ciudad_nombre,ba.barrio_nombre ' +
      '  FROM departamentos dep LEFT JOIN distritos dis ' +
      '  ON ST_Contains(dis.geom, ST_GeomFromText("POINT(' + lng + ' ' + lat + ')",1))' +
      '  LEFT JOIN ciudades ciu ON ST_Contains(ciu.geom, ST_GeomFromText("POINT(' + lng + ' ' + lat + ')",1))' +
      '  LEFT JOIN barrios ba ON ST_Contains(ba.geom, ST_GeomFromText("POINT(' + lng + ' ' + lat + ')",1))' +
      '  WHERE ST_Contains(dep.geom, ST_GeomFromText("POINT(' + lng + ' ' + lat + ')",1)) AND ST_Contains(ciu.geom, ST_GeomFromText("POINT(' + lng + ' ' + lat + ')",1))' +
      ' AND ST_Contains(ciu.geom, ST_GeomFromText("POINT(' + lng + ' ' + lat + ')",1))',
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
            console.log("found department: ", response[0]);
            result(null, response[0]);

            return;
        }

        // Not found Department with the longitude 
        // and the latitude.
        result({ kind: "not_found" }, null);
    });
};

module.exports = Department;