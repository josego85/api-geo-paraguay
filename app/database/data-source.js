require('reflect-metadata');
const { DataSource } = require('typeorm');
const config = require('../config');

const {
  db: { host, port, user, pass, name: database },
} = config;

const AppDataSource = new DataSource({
  type: 'mysql',
  host,
  port,
  username: user,
  password: pass,
  database,
  entities: [`${__dirname}/../entities/*.{js,ts}`],
  synchronize: false,
  logging: false,
});

module.exports = AppDataSource;
