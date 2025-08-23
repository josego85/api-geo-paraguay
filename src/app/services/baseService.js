const ServiceResponse = require('../utils/responses/ServiceResponse');

class BaseService {
  /**
   * @param {object} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  async findAll({ page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', ...filters } = {}) {
    try {
      const { data, total } = await this.repository.findAll({
        page,
        limit,
        sortField,
        sortOrder,
        ...filters,
      });

      return ServiceResponse.success(data, { total, page, limit });
    } catch (error) {
      console.error('BaseService findAll error:', error);
      return ServiceResponse.empty();
    }
  }

  async findById(id) {
    return this.repository.findById(id);
  }
}

module.exports = BaseService;
