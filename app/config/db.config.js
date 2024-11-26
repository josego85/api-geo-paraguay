require('dotenv').config();

const { DB_HOST } = process.env;
const { DB_USER } = process.env;
const { DB_PASSWORD } = process.env;
const { DB_NAME } = process.env;
const { SRID } = process.env;
const { SRID_TRANSFORM } = process.env;

module.exports = {
    DB_HOST,
    DB_USER,
    DB_PASSWORD,
    DB_NAME,
    SRID,
    SRID_TRANSFORM,
};
