const District = require('models/district.model');

const districtService = {
  async findAll(options = {}) {
    return District.findAll(options);
  },

  async findById(districtId) {
    return District.findById(districtId);
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

module.exports = districtService;
