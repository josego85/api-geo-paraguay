'use strict';

require('dotenv').config();

const DB_HOST = process.env.DB_HOST;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const SRID = process.env.SRID;
const SRID_TRANSFORM = process.env.SRID_TRANSFORM;

module.exports = {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    SRID,
    SRID_TRANSFORM,
};
