"use strict";

const { redisClient } = require("../helpers/providers/cache/redisClient.js");
const getCaching      = async (field) => {
    // Query redis.
    const cacheResult = await redisClient.getAsync(
      `${field}`
    );
  
    if(!cacheResult){ return; }
  
    return JSON.parse(cacheResult);
};

module.exports = getCaching;