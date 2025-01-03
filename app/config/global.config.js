require('dotenv').config();

const { APP_NAME, APP_PORT, URL_DOMAIN, REDIS_HOST, REDIS_PORT, MONGO_URI } = process.env;

module.exports = {
  APP_NAME,
  APP_PORT,
  URL_DOMAIN,
  REDIS_HOST,
  REDIS_PORT,
  MONGO_URI,
};
