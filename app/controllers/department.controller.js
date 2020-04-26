const Department = require("../models/department.model.js");

// Retrieve all Department from the database.
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

// Retrieve all Department from the database.
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