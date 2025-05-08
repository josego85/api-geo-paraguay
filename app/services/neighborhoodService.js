const BaseService = require('services/baseService');
const NeighborhoodRepository = require('repositories/NeighborhoodRepository');
const dataSource = require('config/data-source');

const neighborhoodRepo = new NeighborhoodRepository(dataSource);
module.exports = new BaseService(neighborhoodRepo);
