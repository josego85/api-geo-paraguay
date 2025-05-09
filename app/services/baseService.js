class BaseService {
  /**
   * @param {object} repository
   */
  constructor(repository) {
    this.repository = repository;
  }

  async findAll({ page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', ...filters } = {}) {
    return this.repository.findAll({ page, limit, sortField, sortOrder, ...filters });
  }

  async findById(id) {
    return this.repository.findById(id);
  }
}

module.exports = BaseService;
