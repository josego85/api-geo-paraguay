const districtService = require('services/districtService');
const createController = require('./baseController');

const { getAll, getById } = createController({
  service: districtService,
  namePlural: 'Districts',
  nameSingular: 'District',
});

exports.getDistricts = getAll;

exports.getDistrictById = getById;
