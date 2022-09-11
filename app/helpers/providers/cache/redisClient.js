'use strict';

const { REDIS_HOST, REDIS_PORT } = require('config/global.config.js');
const redis = require('redis');
const { promisifyAll } = require('bluebird');

promisifyAll(redis);

const redisClient = redis.createClient({
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    },
});

const save = async (field, data) => {
    const expirationTime = 86400 * 30 * 1; // 1 month.
    const serializedDetails = JSON.stringify(data);

    try {
        // Save in redis.
        await redisClient.setAsync(
            `${field}`,
            serializedDetails,
            'EX',
            expirationTime
        );
    } catch (error) {}
};

module.exports = { redisClient, save };
