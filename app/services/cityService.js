const City = require('models/city.model');

const cityService = {
  async findAll({ page, limit, sortField, sortOrder, filter } = {}) {
    const options = {
      page,
      limit,
      sortField,
      sortOrder,
      filter,
    };

    return City.findAll(options);
  },

  async findById(cityId) {
    return City.findById(cityId);
  },
};

module.exports = cityService;
