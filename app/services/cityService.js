const City = require('models/city.model');

const cityService = {
  async findAll({ page, limit, sortField, sortOrder, filter } = {}) {
    try {
      const options = {
        page,
        limit,
        sortField,
        sortOrder,
        filter,
      };

      return await City.findAll(options);
    } catch (error) {
      throw new Error(`Error fetching cities: ${error.message}`);
    }
  },

  async findById(cityId) {
    return City.findById(cityId);
  },
};

module.exports = cityService;
