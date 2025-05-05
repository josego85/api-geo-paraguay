const { REDIS_CACHE_EXPIRATION_TIME } = require('config/global.config');
const { redisClient } = require('helpers/providers/cache/redisClient');

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
      await redisClient.set(key, JSON.stringify(value), 'EX', REDIS_CACHE_EXPIRATION_TIME);
    } catch (error) {
      console.error('Cache set error:', error);
    }
  },
  async clear() {
    try {
      await redisClient.flushdb();
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  },
};

module.exports = cacheService;
