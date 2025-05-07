const cityService = require('services/cityService');
const createController = require('./baseController');

const { getAll, getById } = createController({
  service: cityService,
  namePlural: 'Cities',
  nameSingular: 'City',
});

exports.getCities = getAll;

exports.getCityById = getById;
