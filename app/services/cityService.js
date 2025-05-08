const BaseService = require('services/baseService');
const CityRepository = require('repositories/CityRepository');
const dataSource = require('config/data-source');

const cityRepo = new CityRepository(dataSource);

module.exports = new BaseService(cityRepo);
