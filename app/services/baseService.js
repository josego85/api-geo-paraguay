class BaseService {
  constructor(model) {
    this.model = model;
  }

  async findAll({ page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', ...filter } = {}) {
    return this.model.findAll({ page, limit, sortField, sortOrder, ...filter });
  }

  async findById(id) {
    return this.model.findById(id);
  }
}

module.exports = BaseService;
