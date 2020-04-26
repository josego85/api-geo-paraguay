const Department = require('../models/department.model.js');


// Retrieve all departments from the database.
exports.findAll = (req, res) =>
{
    Department.getAll((err, data) =>
    {
        if (err)
        {
            res.status(500).send(
            {
                message: err.message || "Some error occurred while retrieving departments."
            });
        }
        else 
        {
            res.send(data);
        }
    });
};

exports.findByLngLat = (req, res) =>
{
    Department.findByLngLat(req.params, (err, data) =>
    {
        if (err)
        {
            res.status(500).send(
            {
                message: err.message || "Some error occurred while retrieving departments."
            });
        }
        else 
        {
            res.send(data);
        }
    });
};