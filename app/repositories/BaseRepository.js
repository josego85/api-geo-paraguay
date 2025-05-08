const { Like } = require('typeorm');

class BaseRepository {
  constructor(dataSource, entity) {
    this.repo = dataSource.getRepository(entity);
  }

  async findAll({ page = 1, limit = 10, sortField = 'id', sortOrder = 'ASC', ...filters }) {
    const where = {};

    for (const [key, val] of Object.entries(filters)) {
      if (val != null) {
        where[key] = Like(`%${val}%`);
      }
    }

    return this.repo.find({
      where,
      order: { [sortField]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findById(id) {
    const entity = await this.repo.findOneBy({ id: Number(id) });
    if (!entity) {
      throw new Error(`${this.repo.metadata.name} not found`);
    }
    return entity;
  }
}

module.exports = BaseRepository;
