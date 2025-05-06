const Department = require('models/department.model');

const departmentService = {
  async findAll({ page, limit, sortField, sortOrder, filter } = {}) {
    const options = {
      page,
      limit,
      sortField,
      sortOrder,
      filter,
    };

    return Department.findAll(options);
  },

  async findById(departmentId) {
    return Department.findById(departmentId);
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

module.exports = departmentService;
