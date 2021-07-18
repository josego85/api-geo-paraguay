"use strict";

import { redisClient } from "helpers/providers/cache/redisClient.js";

const getCaching = async (field) => {
    // Query redis.
    const cacheResult = await redisClient.getAsync(
      `${field}`
    );
  
    if(!cacheResult){ return; }
  
    return JSON.parse(cacheResult);
};

export default getCaching;