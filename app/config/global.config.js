require('dotenv').config();

const {
  APP_NAME,
  APP_PORT,
  URL_DOMAIN,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  MONGO_URI,
  GEOHASH_PRECISION,
} = process.env;

module.exports = {
  APP_NAME,
  APP_PORT,
  URL_DOMAIN,
  REDIS_HOST,
  REDIS_PORT,
  REDIS_PASSWORD,
  MONGO_URI,
  GEOHASH_PRECISION,
};
