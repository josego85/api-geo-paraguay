'use strict';

const { REDIS_HOST, REDIS_PORT } = require('config/global.config.js');
const redis = require('redis');
let redisClient;

(async () => {
    redisClient = redis.createClient({
        socket: {
            host: REDIS_HOST,
            port: REDIS_PORT,
        },
    });

    redisClient.on('error', (error) => console.error(`Error : ${error}`));

    await redisClient.connect();
})();

const save = async (field, data) => {
    const expirationTime = 86400 * 30 * 1; // 1 month.
    const serializedDetails = JSON.stringify(data);

    try {
        // Save in redis.
        await redisClient.set(
            `${field}`,
            serializedDetails,
            'EX',
            expirationTime
        );
    } catch (error) {}
};

module.exports = { redisClient, save };
