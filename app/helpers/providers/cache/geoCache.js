const ngeohash = require('ngeohash');
const { REDIS_CACHE_EXPIRATION_TIME, GEOHASH_PRECISION } = require('config/global.config');
const { save, redisClient } = require('./redisClient');

const getGeoCacheKey = (lng, lat) => {
  const hash = ngeohash.encode(parseFloat(lng), parseFloat(lat), GEOHASH_PRECISION);
  return `GEO_CACHE:${hash}`;
};

const saveGeoLocation = async (lng, lat, data) => {
  const key = getGeoCacheKey(lng, lat);
  await save(key, data, REDIS_CACHE_EXPIRATION_TIME);
};

const getGeoLocation = async (lng, lat) => {
  const key = getGeoCacheKey(lng, lat);

  try {
    const cached = await redisClient.get(key);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    console.error(`Failed to get data from Redis: ${error}`);
    return null;
  }
};

module.exports = {
  saveGeoLocation,
  getGeoLocation,
};
