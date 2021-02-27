"use strict";

const dotenv = require("dotenv");

dotenv.config();

const APP_PORT = process.env.APP_PORT;

module.exports = {
    APP_PORT
};