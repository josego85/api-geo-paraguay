const Neighborhood = require('models/neighborhood.model');

const neighborhoodService = {
  async findAll({ page, limit, sortField, sortOrder, filter } = {}) {
    const options = {
      page,
      limit,
      sortField,
      sortOrder,
      filter,
    };

    return Neighborhood.findAll(options);
  },

  async findById(neighborhoodId) {
    return Neighborhood.findById(neighborhoodId);
  },

  // validateCityData(cityData) {
  //   if (!cityData.ciudad_nombre || typeof cityData.ciudad_nombre !== 'string') {
  //     throw new Error('Invalid ciudad_nombre');
  //   }
  //   if (!Number.isInteger(cityData.distrito_id)) {
  //     throw new Error('Invalid distrito_id');
  //   }
  // },
};

module.exports = neighborhoodService;
