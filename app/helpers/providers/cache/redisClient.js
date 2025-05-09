const Redis = require('ioredis');
const config = require('config');

const { host, port, password } = config.redis;

const redisClient = new Redis({
  host,
  port,
  password,
  retryStrategy(times) {
    return Math.min(times * 50, 2000);
  },
});

redisClient.on('connect', () => {});

redisClient.on('error', (error) => {
  console.error(`Redis Error: ${error}`);
});

const save = async (field, data, expirationTime) => {
  try {
    const serializedDetails = JSON.stringify(data);
    await redisClient.set(field, serializedDetails, 'EX', expirationTime);
  } catch (error) {
    console.error(`Failed to save data in Redis: ${error}`);
  }
};

const closeConnection = async () => {
  try {
    await redisClient.disconnect();
  } catch (error) {
    console.error(`Failed to disconnect Redis client: ${error}`);
  }
};

module.exports = { redisClient, save, closeConnection };
