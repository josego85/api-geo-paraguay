const Neighborhood = require('../models/neighborhood.model.js');

// Retrieve all neighborhood from the database.
exports.findAll = (req, res) =>
{
    Neighborhood.getAll((err, data) =>
    {
        if (err)
        {
            res.status(500).send(
            {
                message: err.message || "Some error occurred while retrieving neighborhood."
            });
        }
        else 
        {
            const json =
            {
                success: true,
                data: data
            }
            res.status(200).json(json);
        }
    });
};