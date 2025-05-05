const City = require('../models/city.model');

const cityService = {
  async findAll(options = {}) {
    return City.findAll(options);
  },

  async findById(cityId) {
    return City.findById(cityId);
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

module.exports = cityService;
