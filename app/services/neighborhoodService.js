const BaseService = require('services/baseService');
const NeighborhoodRepository = require('repositories/NeighborhoodRepository');
const AppDataSource = require('database/data-source');

const neighborhoodRepo = new NeighborhoodRepository(AppDataSource);
module.exports = new BaseService(neighborhoodRepo);
