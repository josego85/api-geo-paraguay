"use strict";

const dotenv = require("dotenv");

dotenv.config();

const APP_PORT            = process.env.APP_PORT;
const URL_DOMAIN          = process.env.URL_DOMAIN;
const URL_EXTERNAL_DOMAIN = process.env.URL_EXTERNAL_DOMAIN
const REDIS_HOST          = process.env.REDIS_HOST;
const REDIS_PORT          = process.env.REDIS_PORT;

module.exports = {
    APP_PORT,
    URL_DOMAIN,
    URL_EXTERNAL_DOMAIN,
    REDIS_HOST,
    REDIS_PORT,
};