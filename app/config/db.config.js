require('dotenv').config();

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, SRID, SRID_TRANSFORM } = process.env;

module.exports = {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  SRID,
  SRID_TRANSFORM,
};
