require('reflect-metadata');
const { DataSource } = require('typeorm');
const config = require('config');
const DepartmentEntity = require('entities/Department');
const DistrictEntity = require('entities/District');
const CityEntity = require('entities/City');
const NeighborhoodEntity = require('entities/Neighborhood');

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
  entities: [DepartmentEntity, DistrictEntity, CityEntity, NeighborhoodEntity],
  synchronize: false,
  logging: false,
});

module.exports = AppDataSource;
