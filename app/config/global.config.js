"use strict";

const dotenv = require("dotenv");

dotenv.config();

const APP_PORT = process.env.APP_PORT;
const URL_DOMAIN = process.env.URL_DOMAIN;

module.exports = {
    APP_PORT,
    URL_DOMAIN,
};