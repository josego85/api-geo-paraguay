const BaseService = require('services/baseService');
const DistrictRepository = require('repositories/DistrictRepository');
const AppDataSource = require('database/data-source');

const districtRepo = new DistrictRepository(AppDataSource);

module.exports = new BaseService(districtRepo);
