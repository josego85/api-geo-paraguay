"use strict";

const getCaching   = require("./app.controller.js");
const { save }     = require("helpers/providers/cache/redisClient.js");
const Neighborhood = require('models/neighborhood.model.js');

// Retrieve all neighborhood from the database.
exports.findAll = async (request, response) =>
{
    const field = 'neighborhood';
    const resultCache = await getCaching(field);
    
    if (resultCache){
        response.status(200).json({
            success: true,
            data: resultCache,
        });

        return ;
    }

    Neighborhood.getAll((err, data) =>
    {
        if (err)
        {
            response.status(500).send(
            {
                message: err.message || "Some error occurred while retrieving neighborhood."
            });
        }
        else 
        {
            // Update cache.
            save(
                field,
                data
            ).catch(error => console.error("Error: ", error));

            const json =
            {
                success: true,
                data: data
            }
            response.status(200).json(json);
        }
    });
};