"use strict";

const getCaching = require("./app.controller.js");
const { save }   = require("helpers/providers/cache/redisClient.js");
const Distrit    = require('models/distrit.model.js');

// Retrieve all distrits from the database.
exports.findAll = async (request, response) => {
    const field = 'distrits';
    const resultCache = await getCaching(field);
    
    if (resultCache){
        response.status(200).json({
            success: true,
            data: resultCache,
        });

        return ;
    }

    Distrit.getAll((err, data) =>{
        if (err)
        {
            response.status(500).send(
            {
                message: err.message || "Some error occurred while retrieving distrit."
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

// Get longitude and latitude of a specific district.
exports.getLngLat = async (request, response) => {
    Distrit.getLngLat(request.params, (err, data) => {
        if (err) {
          response.status(403).send({
            message: request.polyglot.t("not_retrieve_distrit") || err.message,
          });
        } else {
          const json = {
            success: true,
            data: data,
          };
          response.status(200).json(json);
        }
      });
};