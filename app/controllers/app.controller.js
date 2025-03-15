const { redisClient } = require('helpers/providers/cache/redisClient');

const getCaching = async (field) => {
  try {
    const cacheResult = await redisClient.get(`${field}`);

    if (!cacheResult) {
      return null;
    }

    return JSON.parse(cacheResult);
  } catch (error) {
    console.error('Error fetching from cache:', error);
    return null;
  }
};

module.exports = getCaching;
