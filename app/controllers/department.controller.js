"use strict";

import { redisClient, save} from "helpers/providers/cache/redisClient.js";

const Department = require("models/department.model.js");

const getCaching = async (field) => {
  // Query redis.
	const cacheResult = await redisClient.getAsync(
    `${field}`
  );

	if(!cacheResult){ return; }

	return JSON.parse(cacheResult);
};

// Retrieve all departments from the database.
exports.findAll = async (request, response) => {
  const field = 'departaments';
  const resultCache = await getCaching(field);
  
  if (resultCache){
    response.status(200).json({
      success: true,
      data: resultCache,
    });

    return ;
  }

  Department.getAll((err, data) => {
    if (err) {
      response.status(403).send({
        message: request.polyglot.t("not_retrieve_department") || err.message,
      });
    } else {
      // Update cache.
      save(
        field,
        data
      ).catch(error => log.error("Error: ", error));

      const json = {
        success: true,
        data: data,
      };
      response.status(200).json(json);
    }
  });
};

exports.findByLngLat = (request, response) => {
  Department.findByLngLat(request.params, (err, data) => {
    if (err) {
      response.status(403).send({
        message: request.polyglot.t("not_retrieve_department") || err.message,
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
