require('reflect-metadata');
const { DataSource } = require('typeorm');
const config = require('../config');

const {
  db: { host, port, user, pass, name: database },
} = config;
const isProd = process.env.NODE_ENV === 'production';

const AppDataSource = new DataSource({
  type: 'mysql',
  host,
  port,
  username: user,
  password: pass,
  database,
  entities: [`${__dirname}/../entities/*.{js,ts}`],
  synchronize: false,
  logging: !isProd,
});

module.exports = AppDataSource;
