const BaseService = require('services/baseService');
const CityRepository = require('repositories/CityRepository');
const AppDataSource = require('database/data-source');

const cityRepo = new CityRepository(AppDataSource);

module.exports = new BaseService(cityRepo);
