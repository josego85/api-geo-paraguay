const Distrit = require('../models/distrit.model.js');

// Retrieve all distrits from the database.
exports.findAll = (req, res) =>
{
    Distrit.getAll((err, data) =>
    {
        if (err)
        {
            res.status(500).send(
            {
                message: err.message || "Some error occurred while retrieving distrit."
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