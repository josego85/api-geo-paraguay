const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = require('config/global.config');
const redis = require('redis');

let redisClient;

(async () => {
  redisClient = redis.createClient({
    url: `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`,
  });

  redisClient.on('error', (error) => console.error(`Redis Error : ${error}`));

  await redisClient.connect();
})();

const save = async (field, data, expirationTime) => {
  const serializedDetails = JSON.stringify(data);

  try {
    // Save in redis.
    await redisClient.set(`${field}`, serializedDetails, 'EX', expirationTime);
  } catch (error) {
    console.error(`Failed to save data in Redis: ${error}`);
  }
};

module.exports = { redisClient, save };
