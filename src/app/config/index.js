require('dotenv').config();
const Joi = require('joi');

const envSchema = Joi.object({
  APP_NAME: Joi.string().required(),
  APP_PORT: Joi.number().default(5000),
  URL_DOMAIN: Joi.string().required(),

  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.number().default(3306),
  DB_USER: Joi.string().required(),
  DB_PASSWORD: Joi.string().allow('').required(),
  DB_NAME: Joi.string().required(),
  SRID: Joi.number().default(4326),
  SRID_TRANSFORM: Joi.number().default(3857),

  REDIS_HOST: Joi.string().required(),
  REDIS_PORT: Joi.number().default(6379),
  REDIS_PASSWORD: Joi.string().allow('').required(),
  REDIS_CACHE_EXPIRATION_TIME: Joi.number().default(2_592_000),

  MONGO_URI: Joi.string().required(),
  GEOHASH_PRECISION: Joi.number().default(7),
}).unknown();

const { error, value: env } = envSchema.validate(process.env);
if (error) {
  console.error('❌ Invalid environment variables:', error.message);
  process.exit(1);
}

const config = Object.freeze({
  app: {
    name: env.APP_NAME,
    port: env.APP_PORT,
    domain: env.URL_DOMAIN,
  },
  db: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    pass: env.DB_PASSWORD,
    name: env.DB_NAME,
    srid: env.SRID,
    sridTransform: env.SRID_TRANSFORM,
  },
  redis: {
    host: env.REDIS_HOST,
    port: env.REDIS_PORT,
    password: env.REDIS_PASSWORD,
    cacheExpiration: env.REDIS_CACHE_EXPIRATION_TIME,
  },
  mongo: {
    uri: env.MONGO_URI,
  },
  geohashPrecision: env.GEOHASH_PRECISION,
});

module.exports = config;
