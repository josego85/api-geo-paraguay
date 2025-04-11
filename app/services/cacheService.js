const { REDIS_CACHE_EXPIRATION_TIME } = require('config/global.config');
const { redisClient, save } = require('helpers/providers/cache/redisClient');

const cacheService = {
  async get(key) {
    try {
      const cacheResult = await redisClient.get(key);
      return cacheResult ? JSON.parse(cacheResult) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  },
  async set(key, value) {
    try {
      await save(key, value, REDIS_CACHE_EXPIRATION_TIME);
    } catch (error) {
      console.error('Cache set error: ', error);
    }
  },
};

module.exports = cacheService;
