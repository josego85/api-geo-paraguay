require('dotenv').config();

const { APP_NAME } = process.env;
const { APP_PORT } = process.env;
const { URL_DOMAIN } = process.env;
const { REDIS_HOST } = process.env;
const { REDIS_PORT } = process.env;
const { MONGO_URI } = process.env;

module.exports = {
    APP_NAME,
    APP_PORT,
    URL_DOMAIN,
    REDIS_HOST,
    REDIS_PORT,
    MONGO_URI,
};
