const BaseService = require('services/baseService');
const DistrictRepository = require('repositories/DistrictRepository');
const dataSource = require('config/data-source');

const districtRepo = new DistrictRepository(dataSource);

module.exports = new BaseService(districtRepo);
