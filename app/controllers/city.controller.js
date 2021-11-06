"use strict";

const getCaching = require("./app.controller.js");
const { save }   = require("helpers/providers/cache/redisClient.js");
const City       = require('models/city.model.js');

// Retrieve all city from the database.
exports.findAll = async (request, response) => {
    const field = 'cities';
    const resultCache = await getCaching(field);
    
    if (resultCache){
        response.status(200).json({
            success: true,
            data: resultCache,
        });

        return ;
    }

    City.getAll((err, data) =>
    {
        if (err)
        {
            response.status(500).send(
            {
                message: err.message || "Some error occurred while retrieving city."
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