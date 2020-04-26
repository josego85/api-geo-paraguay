const City = require('../models/city.model.js');

// Retrieve all city from the database.
exports.findAll = (req, res) =>
{
    City.getAll((err, data) =>
    {
        if (err)
        {
            res.status(500).send(
            {
                message: err.message || "Some error occurred while retrieving city."
            });
        }
        else 
        {
            res.send(data);
        }
    });
};