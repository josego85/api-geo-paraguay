"use strict";

import { REDIS_HOST, REDIS_PORT } from "config/global.config.js";
import redis from "redis";
import bluebird from "bluebird";

bluebird.promisifyAll(redis.RedisClient.prototype);

const redisClient = bluebird.promisifyAll(redis).createClient({
    host: REDIS_HOST,
    port: REDIS_PORT
});

const save = async (field, data) => {
    const expirationTime = 86400 * 30 * 1;	// 1 month.
	const serializedDetails = JSON.stringify(data);

	// Save in redis.
	await redisClient.setAsync(`${field}`,
      serializedDetails, "EX", expirationTime);
};

export { redisClient, save };