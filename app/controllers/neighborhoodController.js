const neighborhoodService = require('services/neighborhoodService');
const createController = require('./baseController');

const { getAll, getById } = createController({
  service: neighborhoodService,
  namePlural: 'Neighborhoods',
  nameSingular: 'Neighborhood',
});

exports.getNeighborhoods = getAll;

exports.getNeighborhoodById = getById;
