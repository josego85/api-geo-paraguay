'use strict';

const { redisClient } = require('helpers/providers/cache/redisClient.js');
const getCaching = async (field) => {
    try {
        const cacheResult = await redisClient.getAsync(`${field}`);

        if (!cacheResult) {
            return;
        }

        return JSON.parse(cacheResult);
    } catch (error) {
        return ;
    }
};

module.exports = getCaching;
