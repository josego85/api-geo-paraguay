require('dotenv').config();

const APP_NAME = process.env.APP_NAME;
const APP_PORT = process.env.APP_PORT;
const URL_DOMAIN = process.env.URL_DOMAIN;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const MONGO_URI = process.env.MONGO_URI;

module.exports = {
    APP_NAME,
    APP_PORT,
    URL_DOMAIN,
    REDIS_HOST,
    REDIS_PORT,
    MONGO_URI,
};
